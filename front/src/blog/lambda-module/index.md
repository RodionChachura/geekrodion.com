---
date: "2019-11-03"
title: "AWS Lambda, CI/CD and API Gateway with Terraform Module"
description: "This module creates AWS Lambda function, make it accessible on a given domain and provides CI/CD"
category: "programming"
keywords: [DocumentDB, AWS Lambda, Terraform, DevOps, MongoDB]
featuredImage: main.png
resources: [
  GitHub https://github.com/RodionChachura/terraform-pomodoro-lambda
]
---

![](/main.png)

## Reusable Terraform Module

[Increaser](https://increaser.org/) has seven AWS Lambdas, and each of them managed by Terraform. To create these lambdas and resources related to them, I copied the configuration from one terraform file to another, repeating the same code over and over.

![Increaser's Lambdas](/list.png)

Finally, I’ve decided to refactor infrastructure and created a terraform module that was used in five services now. This module creates AWS Lambda function and optionally can make it accessible on a given domain. Also, if the source code is on GitHub, it can automatically update Lambda every time the branch is updated. The goal for writing this story is to provide a template that you can modify and use in your project

[vars.tf (source code)](https://github.com/RodionChachura/terraform-pomodoro-lambda/blob/master/vars.tf)

We can start with the variables. Only one of them is required — name, it will be used in resources as part of the name. The next two variables will be passed down to the lambda resource. After that, we have a block of variables related to continuous delivery and block related to making lambda accessible on HTTP.

[main.tf (source code)](https://github.com/RodionChachura/terraform-pomodoro-lambda/blob/master/main.tf)

In this file, we have two data resources that will be used to get account id and region.

[lambda.tf (source code)](https://github.com/RodionChachura/terraform-pomodoro-lambda/blob/master/lambda.tf)

Let’s start with describing resources for AWS Lambda. First, we need to have a storage for zipped lambda code. Part of the name of the bucket comes from variables. So that if the name variable is pomodoro-api, the bucket will have the name `tf-pomodoro-api-storage`.

To make the lambda work and return something after we’ve run terraform apply, we are pushing to S3 bucket zipped mock lambda, source code for which located in the same directory with Terraform configuration.

Since all lambdas in Pomodoro by Increaser have almost the same configuration, there are only two variables that users of the module can pass to the lambda — memory size, and environment variables. The rest of the file contains roles and policies that allow Lambda to do everything.

[gateway.tf (source code)](https://github.com/RodionChachura/terraform-pomodoro-lambda/blob/master/gateway.tf)

To access lambda by HTTP, we need to create AWS API Gateway resources. If we set the with_api_gateway variable to false, none of these resources would be created. Depending on this variable, the count will be equal to zero or one. And since we are using count, we need to use the index to refer to the resource.

To enable CORS, we are copying the configuration from this repository. We can’t use it as a module, because at the moment of writing, terraform doesn’t support count for modules.

[with_domain.tf (source code)](https://medium.com/@geekrodion/aws-lambda-ci-cd-and-api-gateway-with-terraform-module-18d92162f33)

If we have a domain and certificate on AWS, we can make the lambda accessible at `https://${var.name}.${var.main_domain}`.

[cd.tf (source code)](https://github.com/RodionChachura/terraform-pomodoro-lambda/blob/master/cd.tf)

This part is pretty custom because two of these requirements must be met to make continuous delivery work:
1. GitHub is being used as a code repository.
2. Container for the pipeline in the ECR registry.

If you have GitHub repository, but don’t have a container in the registry you can check [this story](https://medium.com/@geekrodion/deploying-spa-on-aws-with-terraform-codepipeline-6290529c24dfs).

Also, we need to set a token as an environment variable. It is quite simple to get you can find steps [there](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

[outputs.tf (source code)](https://github.com/RodionChachura/terraform-pomodoro-lambda/blob/master/outputs.tf)

Here we only have two outputs because these are the only ones that were used by other resources in the app infrastructure.