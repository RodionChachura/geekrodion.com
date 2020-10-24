---
path: "/localstack-terraform"
date: "2018-07-09"
title: "System Testing: Localstack + Terraform"
description: "Using Terraform and Localstack to test services"
category: "programming"
keywords: [AWS, Terraform, Localstack, DevOps, Testing]
featuredImage: main.png
---

![](/main.png)

I am a big believer in the importance of testing. It is cool when you can write a batch of tests before implementing the feature and then see how the number of green tests goes up. TDD is great. Lately, I changed my main activities and started spending most of the time working with DevOps and Microservices on AWS. Yet after some time, I started noticing that the process isn't enjoyable. Most of the time, it is a routine, and a long list of technologies makes you sick and tired. More often, I found myself testing services by hand since you can’t be sure that after deploy, the service will work with other services correctly.

## Testing Pipeline

After some time, I decided that it can’t last this way any longer, and I need to find a way to start testing these services. The main problem is testing how service work on AWS infrastructure. While researching this question, I found a technology — [Localstack](https://github.com/localstack/localstack). It allows you to use AWS services locally, and it was what I needed.

With Localstack in place, I decided to write a testing pipeline. The first step is to run Localstack. You specify AWS services needed for the tests and region if not default one needed.

```shell{promptUser: geekrodion}
export SERVICES=s3,lambda
export DEFAULT_REGION=$AWS_DEFAULT_REGION
localstack start
```

Then you run Terraform commands inside the directory with `.tf` files.

```shell{promptUser: geekrodion}
terraform init
terraform apply -lock=false -auto-approve
```

Now you have your infrastructure running on Localstack. And you can run tests. For example:

```shell{promptUser: geekrodion}
npm test
```

Then we want to destroy our infrastructure, since we don’t want to have the DynamoDB or S3 with old data next time tests will be launched.

```shell{promptUser: geekrodion}
terraform destroy -lock=false -auto-approve
```

After this, you can destroy processes with Localstack services. For example, if we used in our tests AWS Lambda and DynamoDB — we will run these commands.

```shell{promptUser: geekrodion}
# fuser -n tcp -k $DYNAMODB_PORT
# fuser -n tcp -k $LAMBDA_PORT
```

That’s it! This way, you can run tests using Terraform and Localstack. However, I would like to take a closer look at the Terraform part.

## Terraform + Localstack

We have AWS Lambda that works with DynamoDB. And we have Terraform modules. If you the only one who works with terraforms and responsible for DevOps, it is not such bad practice to keep all terraforms code and state in one place. This way, you can take a specific module from the repository. And use appropriate modules for testing.

![repo-structure](/structure.png)

```hcl
provider "aws" {
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    s3_force_path_style         = true
    access_key                  = "mock_access_key"
    secret_key                  = "mock_secret_key"
    endpoints {
        dynamodb     = "http://localhost:4569"
        lambda       = "http://localhost:4574"
    }
}
module "dynamodb" {
    source = "git::ssh://<YOUR_REPO>//modules/dynamodb"
    env    = "test"
}
module "lambda" {
    source = "git::ssh://<YOUR_REPO>//modules/lambda"
    env    = "test"
}
```

If you have small and loosely coupled microservice with terraforms for it — such an approach for testing can be OK. But if you have a large service with a bunch of dependencies, I am not sure that this approach will be suitable. Since there are caveats out there, for example, when I write AWS Lambda that triggered by DynamoDB streams, I found that Localstack has an endpoint for streams, but Terraform lacking such one. It was a problem, and I made additional changes in the infrastructure repository so that I can turn off streams. The second hit was IAM. And it is quite a big problem since I already have IAM stuff in the module. Because of this, I ended up creating IAM resources for part of the test environment on real AWS.