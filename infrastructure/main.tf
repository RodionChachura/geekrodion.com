provider "aws" {
}

provider "aws" {
  region = "us-east-1"
  alias = "virginia"
}

resource "aws_route53_zone" "route_zone" {
  name = "${var.domain}"
}

resource "aws_acm_certificate" "domain_virginia" {
  provider = "aws.virginia"
  domain_name = "${var.domain}"
  validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation_virginia" {
  name = "${aws_acm_certificate.domain_virginia.domain_validation_options.0.resource_record_name}"
  type = "${aws_acm_certificate.domain_virginia.domain_validation_options.0.resource_record_type}"
  records = ["${aws_acm_certificate.domain_virginia.domain_validation_options.0.resource_record_value}"]
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
    domain_name = "${aws_s3_bucket.frontend.bucket_domain_name}"
    origin_id   = "${var.bucket_name}"
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