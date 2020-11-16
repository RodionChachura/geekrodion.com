provider "aws" {
}

provider "aws" {
  region = "us-east-1"
  alias = "virginia"
}

terraform {
  backend "s3" {
    bucket = "infrastructure-remote-state"
    key    = "geekrodion/frontend.tfstate"
    region = "eu-central-1"
  }
}

resource "aws_route53_zone" "route_zone" {
  name = "${var.domain}"
}

resource "aws_acm_certificate" "domain_virginia" {
  provider = aws.virginia
  domain_name = "${var.domain}"
  validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation_virginia" {
  name = "${tolist(aws_acm_certificate.domain_virginia.domain_validation_options)[0].resource_record_name}"
  type = "${tolist(aws_acm_certificate.domain_virginia.domain_validation_options)[0].resource_record_type}"
  records = ["${tolist(aws_acm_certificate.domain_virginia.domain_validation_options)[0].resource_record_value}"]
  zone_id = "${aws_route53_zone.route_zone.zone_id}"
  ttl = 60
}

resource "aws_acm_certificate_validation" "cert_validation_virginia" {
  provider = "aws.virginia"
  certificate_arn = "${aws_acm_certificate.domain_virginia.arn}"
  validation_record_fqdns = ["${aws_route53_record.cert_validation_virginia.fqdn}"]
}

resource "aws_s3_bucket" "frontend" {
  bucket = "${var.bucket_name}"
  acl = "public-read"
  policy = <<EOF
{
  "Id": "bucket_policy_site",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "bucket_policy_site_main",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.bucket_name}/*",
      "Principal": "*"
    }
  ]
}
EOF
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_cloudfront_distribution" "frontend" {
  depends_on = ["aws_acm_certificate_validation.cert_validation_virginia"]
    origin {
    domain_name = "${aws_s3_bucket.frontend.website_endpoint}"
    origin_id = "${var.bucket_name}"

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["${var.domain}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.bucket_name}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    compress = true
    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.domain_virginia.arn}"
    ssl_support_method = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_caching_min_ttl = "0"
    error_code = "403"
    response_code = "200"
    response_page_path = "/"
  }
  custom_error_response {
    error_caching_min_ttl = "0"
    error_code = "404"
    response_code = "200"
    response_page_path = "/"
  }
  custom_error_response {
    error_caching_min_ttl = "0"
    error_code = "400"
    response_code = "200"
    response_page_path = "/"
  }
}

resource "aws_route53_record" "frontend_record" {
  zone_id = "${aws_route53_zone.route_zone.zone_id}"
  name    = ""
  type    = "A"

  alias {
    name = "${aws_cloudfront_distribution.frontend.domain_name}"
    zone_id = "${aws_cloudfront_distribution.frontend.hosted_zone_id}"
    evaluate_target_health = false
  }
}


resource "aws_ecr_repository" "ci" {
  name = "tf-ci"
}

resource "aws_ecr_repository_policy" "ci-policy" {
  repository = "${aws_ecr_repository.ci.name}"

  policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "everybody",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "ecr:*"
      ]
    }
  ]
}
EOF
}

data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "artifacts" {
  bucket = "tf-${var.bucket_name}-pipeline-artifacts"
  acl    = "private"
}

resource "aws_iam_role" "codepipeline_role" {
  name = "tf-${var.bucket_name}-pipeline"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name = "tf-${var.bucket_name}-pipeline"
  role = "${aws_iam_role.codepipeline_role.id}"
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
EOF
}

resource "aws_iam_role" "codebuild_role" {
  name = "tf-${var.bucket_name}-codebuild-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codebuild_policy" {
  role        = "${aws_iam_role.codebuild_role.name}"

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
POLICY
}

resource "aws_codebuild_project" "codebuild" {
  name         = "tf-codebuild-${var.bucket_name}"
  service_role = "${aws_iam_role.codebuild_role.arn}"

  artifacts {
    type = "CODEPIPELINE"
  }


  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.region}.amazonaws.com/tf-ci:${var.ci_container_name}"
    type         = "LINUX_CONTAINER"

    environment_variable {
      name = "AWS_ACCESS_KEY_ID"
      value = "${var.access_key}"
    }
    environment_variable {
      name = "AWS_SECRET_ACCESS_KEY"
      value = "${var.secret_key}"
    }
    environment_variable {
      name = "AWS_DEFAULT_REGION"
      value = "${var.region}"
    }
    environment_variable {
      name = "BUCKET"
      value = "${var.bucket_name}"
    }
    environment_variable {
      name = "DISTRIBUTION_ID"
      value = "${aws_cloudfront_distribution.frontend.id}"
    }
  }

  source {
    type      = "CODEPIPELINE"
  }
}

# Since I'm the only person working on the project
# I don't need AWS CodePipeline

# resource "aws_codepipeline" "pipeline" {
#   name     = "tf-${var.bucket_name}-pipeline"
#   role_arn = "${aws_iam_role.codepipeline_role.arn}"

#   artifact_store {
#     location = "${aws_s3_bucket.artifacts.bucket}"
#     type     = "S3"
#   }

#   stage {
#     name = "Source"

#     action {
#       name             = "Source"
#       category         = "Source"
#       owner            = "ThirdParty"
#       provider         = "GitHub"
#       version          = "1"
#       output_artifacts = ["source"]

#       configuration = {
#         Owner      = "${var.repo_owner}"
#         Repo       = "${var.repo_name}"
#         Branch     = "${var.branch}"
#       }
#     }
#   }

#   stage {
#     name = "Build"

#     action {
#       name            = "Build"
#       category        = "Build"
#       owner           = "AWS"
#       provider        = "CodeBuild"
#       input_artifacts = ["source"]
#       version         = "1"

#       configuration = {
#         ProjectName = "${aws_codebuild_project.codebuild.name}"
#       }
#     }
#   }
# }