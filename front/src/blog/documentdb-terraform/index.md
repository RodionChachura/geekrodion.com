---
date: "2019-04-27"
title: "Amazon DocumentDB + AWS Lambda with Terraform"
description: "Our final goal is to have running Amazon DocumentDB that we can access from local computer and AWS Lambda"
category: "programming"
keywords: [DocumentDB, AWS Lambda, Terraform, DevOps, MongoDB]
featuredImage: main.jpg
headline: "Amazon DocumentDB + AWS Lambda with Terraform"
resources: [
  GitHub https://github.com/RodionChachura/terraform-aws-documentdb-lambda
]
---

![](/main.jpg)

## Amazon DocumentDB

Recently AWS launched a new service — Amazon DocumentDB designed to give us the performance, scalability, and availability we need when operating MongoDB workloads at scale. In this story, we will implement a stack that consists of these resources:

* **S3** storage to provide source code to AWS Lambda.
* **AWS Lambda** to run our microservice.
* **API Gateway** to interact with microservice.
* **Route 53** to access API Gateway by our domain.
* **Amazon DocumentDB** to provide MongoDB database.
* **EC2** instance to access database locally via SSH.
* **VPC** so that EC2 instance and AWS Lambda can access Amazon DocumentDB.

Our final goal is to have running Amazon DocumentDB that we can access from local computer and AWS Lambda. Also, we want to make Lambda available at some URL. In the end, we should have a repository that looks like this.

![structure of a repository](/structure.png)

My goal at this article is to provide you information about how those resources work together and how to launch them in a few minutes without stress. You can clone the GitHub repository or go along and describe all resources on the way. If you only need to run Amazon DocumentDB or don’t have a domain you can delete terraform files that contain resources you won’t need.

## Variables and Main

First things first, before we start writing any resources we need to set environment variables(AWS credentials).

```shell{promptUser: ''}
export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
```

Next, let’s create the first terraform file — `vars.tf`. Here we specify all variables we need to create resources on AWS.

```hcl:title=vars.tf
variable "region" {
  default = "us-east-1"
}

variable "name" {
  default = "geek-api"
}

variable "docdb_instance_class" {
  default = "db.r4.large"
}

variable "docdb_password" {}

# optional
variable "certificate_arn" {}
variable "zone_id" {}
variable "main_domain" {}
```

The first variable is the **region**. And we need to choose from those regions that support Amazon DocumentDB. At the moment of writing, there are only a few of them. Also, we need to take into consideration the fact that prices differ depending on the region.

We can specify whatever **name** we want — it will be used to name resources.

We need to provide a **docdb_password** that will be used to connect to MongoDB.

If we need a more powerful instance, we can change the value of the **docdb_instance_class** variable.

The last three variables needed to serve Lambda via API Gateway on the domain we own. If we don’t have one — we leave those variables undefined.

We can specify variables by editing a file or by setting environment variables like this.

```shell{promptUser: ''}
export TF_VAR_name=<NAME_FOR_RESOURCES>
export TF_VAR_docdb_password=<PASSWORD_FOR_AMAZON_DOCUMENTDB>

export TF_VAR_certificate_arn=<YOUR_DOMAIN_SERTIFICATE_ARN>
export TF_VAR_zone_id=<YOUR_DOMAIN_ZONE_ID>
export TF_VAR_main_domain=<YOUR_DOMAIN>
```

File `main.tf` will only contain provider with region taken from variables.

```hcl:title=main.tf
provider "aws" {
  region = "${var.region}"
}
```

## VPC

Amazon DocumentDB can be accessed only from resources in the same VPC. Therefore we start by creating a VPC and security group in `vpc.tf` file.

```hcl:title=vpc.tf
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "tf-${var.name}"
  cidr = "10.0.0.0/16"

  azs             = ["${var.region}a", "${var.region}b", "${var.region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_dns_hostnames = true
  enable_dns_support = true
  enable_nat_gateway = true
  enable_vpn_gateway = true
  single_nat_gateway = false
}

resource "aws_security_group" "service" {
  name        = "tf-${var.name}"
  vpc_id      = "${module.vpc.vpc_id}"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
}
```

## Amazon DocumentDB

We will describe a few resources in `docdb.tf` to run database cluster. In our example cluster will contain only one instance and we disable TLS to make it simpler to connect to the database.

```hcl:title=docdb.tf
resource "aws_docdb_subnet_group" "service" {
  name       = "tf-${var.name}"
  subnet_ids = ["${module.vpc.private_subnets}"]
}

resource "aws_docdb_cluster_instance" "service" {
  count              = 1
  identifier         = "tf-${var.name}-${count.index}"
  cluster_identifier = "${aws_docdb_cluster.service.id}"
  instance_class     = "${var.docdb_instance_class}"
}

resource "aws_docdb_cluster" "service" {
  skip_final_snapshot     = true
  db_subnet_group_name    = "${aws_docdb_subnet_group.service.name}"
  cluster_identifier      = "tf-${var.name}"
  engine                  = "docdb"
  master_username         = "tf_${replace(var.name, "-", "_")}_admin"
  master_password         = "${var.docdb_password}"
  db_cluster_parameter_group_name = "${aws_docdb_cluster_parameter_group.service.name}"
  vpc_security_group_ids = ["${aws_security_group.service.id}"]
}

resource "aws_docdb_cluster_parameter_group" "service" {
  family = "docdb3.6"
  name = "tf-${var.name}"

  parameter {
    name  = "tls"
    value = "disabled"
  }
}
```

## AWS Lambda

In this example, AWS Lambda will run NodeJS microservice. To use another language one should update two parameters in `aws_lambda_function` resource — `handler` and `runtime`.

```hcl:title=lambda.tf
data "archive_file" "local_zipped_lambda" {
  type        = "zip"
  source_dir = "${path.module}/lambda"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_s3_bucket_object" "zipped_lambda" {
  bucket = "${aws_s3_bucket.lambda_storage.bucket}"
  key    = "lambda.zip"
  source = "${data.archive_file.local_zipped_lambda.output_path}"
}

resource "aws_s3_bucket" "lambda_storage" {
  bucket = "tf-${var.name}-storage"
}

resource "aws_lambda_function" "service" {
  function_name = "tf-${var.name}"

  s3_bucket = "${aws_s3_bucket.lambda_storage.bucket}"
  s3_key    = "${aws_s3_bucket_object.zipped_lambda.key}"

  handler     = "src/lambda.handler"
  runtime     = "nodejs8.10"
  role        = "${aws_iam_role.service.arn}"

  vpc_config {
    subnet_ids = ["${module.vpc.public_subnets}"]
    security_group_ids = ["${aws_security_group.service.id}"]
  }

  environment {
    variables {
      DB_CONNECTION_STRING = "mongodb://${aws_docdb_cluster.service.master_username}:${aws_docdb_cluster.service.master_password}@${aws_docdb_cluster.service.endpoint}:${aws_docdb_cluster.service.port}"
    }
  }
}

resource "aws_iam_role" "service" {
  name = "tf-${var.name}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "service" {
  name = "tf-${var.name}"
  role = "${aws_iam_role.service.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:*",
        "ec2:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "service" {
  name = "tf-${var.name}"
  path = "/"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "service" {
  role       = "${aws_iam_role.service.name}"
  policy_arn = "${aws_iam_policy.service.arn}"
}
```

To create and run AWS Lambda, we need to have source code in S3 bucket first. But because we don’t have any microservice yet, we create folder lambda and inside of it folder src that contains a file named `lambda.js`.

```js:title=lambda.js
exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from AWS Lambda!'
    })
  }
  callback(null, response)
}
```

By using terraform `archive_file` and the `aws_s3_bucket_object`, we can zip the lambda folder into `lambda.zip` and deploy it to S3 bucket. To access MongoDB in our microservice, we provide connection string as an environment variable to AWS Lambda.

## API Gateway

To access Lambda via HTTPS, we will describe API Gateway resources at `api_gateway.tf`.

```hcl:title=api_gateway.tf
resource "aws_api_gateway_rest_api" "service" {
  name        = "tf-${var.name}"
}

resource "aws_api_gateway_method" "service_root" {
  rest_api_id   = "${aws_api_gateway_rest_api.service.id}"
  resource_id   = "${aws_api_gateway_rest_api.service.root_resource_id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "service_root" {
  rest_api_id   = "${aws_api_gateway_rest_api.service.id}"
  resource_id   = "${aws_api_gateway_rest_api.service.root_resource_id}"
  http_method = "${aws_api_gateway_method.service_root.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.service.invoke_arn}"
}

resource "aws_api_gateway_resource" "service" {
  rest_api_id = "${aws_api_gateway_rest_api.service.id}"
  parent_id   = "${aws_api_gateway_rest_api.service.root_resource_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "service" {
  rest_api_id   = "${aws_api_gateway_rest_api.service.id}"
  resource_id   = "${aws_api_gateway_resource.service.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "service" {
  rest_api_id = "${aws_api_gateway_rest_api.service.id}"
  resource_id = "${aws_api_gateway_method.service.resource_id}"
  http_method = "${aws_api_gateway_method.service.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.service.invoke_arn}"
}

data "aws_caller_identity" "current" {}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.service.arn}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.service.id}/*/*"
}

module "cors" {
  source = "github.com/carrot/terraform-api-gateway-cors-module"
  resource_id = "${aws_api_gateway_resource.service.id}"
  rest_api_id = "${aws_api_gateway_rest_api.service.id}"
}

resource "aws_api_gateway_deployment" "service" {
  depends_on = ["module.cors", "aws_api_gateway_integration.service"]
  rest_api_id = "${aws_api_gateway_rest_api.service.id}"
  stage_name  = "${var.name}"
}
```

If we have a domain in AWS and we specified environment variables, we can create Route 53 record and serve API Gateway at given domain name. At the start of each resource at `api_gateway_plus_domain.tf` we specify `count` — if a domain value is not specified count will be equal to zero and resource will not be created.

```hcl:title=api_gateway_plus_domain_name.tf
resource "aws_api_gateway_domain_name" "service" {
  count = "${var.main_domain != "" ? 1 : 0}"
  certificate_arn = "${var.certificate_arn}"
  domain_name     = "${var.name}.${var.main_domain}"
}

resource "aws_route53_record" "service" {
  count = "${var.main_domain != "" ? 1 : 0}"
  name    = "${aws_api_gateway_domain_name.service.domain_name}"
  type    = "A"
  zone_id = "${var.zone_id}"

  alias {
    evaluate_target_health = true
    name                   = "${aws_api_gateway_domain_name.service.cloudfront_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.service.cloudfront_zone_id}"
  }
}

resource "aws_api_gateway_base_path_mapping" "service" {
  count = "${var.main_domain != "" ? 1 : 0}"
  api_id      = "${aws_api_gateway_rest_api.service.id}"
  stage_name  = "${aws_api_gateway_deployment.service.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.service.domain_name}"
}
```

## EC2 Instance

We only can connect to Amazon DocumentDB when we are at the same VPC. Because of this, we need to create EC2 instance in the same VPC, and by connecting to it via ssh, we can interact with MongoDB.

```hcl:title=instance.tf
data "aws_ami" "service" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-xenial-16.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}

resource "aws_instance" "service" {
  ami           = "${data.aws_ami.service.id}"
  vpc_security_group_ids = ["${aws_security_group.service.id}"]
  subnet_id = "${module.vpc.public_subnets[0]}"
  instance_type = "t2.micro"
  key_name = "${aws_key_pair.service.key_name}"

  provisioner "remote-exec" {
    inline = [
      "sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5",
      "echo 'deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse' | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list",
      "sudo apt-get update",
      "sudo apt-get install -y mongodb-org-shell"
    ]
  }
  
  connection {
    type = "ssh"
    user = "ubuntu"
    private_key = "${tls_private_key.service.private_key_pem}"
  }
}

resource "tls_private_key" "service" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "service" {
  key_name   = "tf-${var.name}-ec2"
  public_key = "${tls_private_key.service.public_key_openssh}"
}

resource "local_file" "service_private_key" {
  content = "${tls_private_key.service.private_key_pem}"
  filename = "${aws_key_pair.service.key_name}"
  provisioner "local-exec" {
    command = "chmod 400 ${aws_key_pair.service.key_name}"
  }
}
```

Our instance will use Ubuntu as an OS. To install MongoDB shell, we will use provisioner that will run listed commands in the newly created instance. Also, we will create a key pair that required to connect to the instance from the local computer. To save the private key in the file, we are using `local_file` resource.

## Creating Resources

![creating resources](/creating.jpeg)

To access those resources after creation, we need to make some outputs. At `outputs.tf` we list what data we want to see in the terminal when all resources successfully created.

```hcl:title=outputs.tf
output "url" {
  value = "${var.main_domain != "" ? "https://${var.name}.${var.main_domain}" : "${aws_api_gateway_deployment.service.invoke_url}"}"
}

output "aws_instance_public_dns" {
  value = "${aws_instance.service.public_dns}"
}

output "docdb_endpoint" {
  value = "${aws_docdb_cluster.service.endpoint}"
}

output "docdb_username" {
  value = "${aws_docdb_cluster.service.master_username}"
}

output "bucket" {
  value = "${aws_s3_bucket.lambda_storage.bucket}"
}

output "bucket_key" {
  value = "${aws_s3_bucket_object.zipped_lambda.key}"
}

output "name" {
  value = "${var.name}"
}
```

Now let’s run those two commands to create resources.

```shell{promptUser: ''}
terraform init
terraform apply
```

![after running "terraform apply"](/applying.png)

## Testing Out

![testing out](/testing.jpeg)

Let’s grab URL from outputs, and paste it in the browser.

![response from AWS Lambda](/response.png)

Now let’s connect to the EC2 instance via SSH.

```shell{promptUser: ''}
ssh -i tf-<var.name>-ec2 ubuntu@<aws_instance_public_dns>
```

After we created all resources, the private key appeared in directory with our terraform files, in this example it is `tf-geek-api-ec2`. Public DNS of instance we can take from outputs.

![connecting to EC2 instance](/connecting.png)

To connect to MongoDB, we type the command shown below.

```shell{promptUser: ''}
mongo \
  --host <docdb_endpoint> \
  --username <docdb_username> \
  --password <var.docdb_password>
```

Both endpoint to database and username we can take from outputs. Password we specified at variables.

![connecting to MongoDB](/connecting-mongo.png)

To update Lambda with a new version of microservice, we type those commands.

```shell{promptUser: ''}
export AWS_DEFAULT_REGION=<var.region>
aws s3 cp lambda.zip s3://<bucket>/<bucket_key>
aws lambda update-function-code --function-name tf-<var.name> --s3-bucket <bucket> --s3-key <bucket_key>
```

Both endpoint to database and username we can take from outputs. Name and region we specified at variables.

![updating Lambda](/updating-lambda.png)

At this post, we created a lot of resources that can be used to create new microservices that will leverage the power of DocumentDB and Lambda.