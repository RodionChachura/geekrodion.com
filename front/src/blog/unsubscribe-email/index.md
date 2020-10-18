---
path: "/unsubscribe-email"
date: "2019-10-13"
title: "Unsubscribe Link in Email with AWS Lambda"
description: "We will add a link in the newsletter that will lead to the page triggering AWS lambda responsible for unsubscribing the user"
category: "programming"
keywords: [AWS, Terraform, AWS Lambda, NodeJS, Email Marketing]
featuredImage: main.png
headline: "Unsubscribe Link in Email with AWS Lambda"
resources: [
  GitHub https://github.com/RodionChachura/email-unsubscribe-lambda
]
---

![](/main.png)

## Unsubscribe from Newsletter

You are sending emails to users, but don’t provide them a way to unsubscribe from these emails? Let me show you pretty quick how I added unsubscribe link to [Increaser](https://increaser.org) newsletter so that you can do the same in no time.

![unsubscribing from Increaser news](/example.gif)

In this story, we will add a link in the newsletter that will lead to the page triggering AWS lambda responsible for unsubscribing the user. To create all the needed infrastructure, we will use Terraform.

## Unsubscribe Link

First, we are going to add an unsubscribe link to the email. The link from the example below ask to unsubscribe a given user from [Increaser](https://increaser.org) news.

```html
<a
  target="_blank"
  href="https://pomodoro-subscriber.increaser.org/pomodoro-news-email/{{id}}/unsubscribe"
>unsubscribe</a>
```

This link leads to AWS Lambda that will handle email subscriptions — `pomodoro-subscriber.increaser.org`. The route has three parts:
1. Type of email(pomodoro-news-email)
2. User Id
3. Action(unsubscribe)

## AWS Lambda

From `lambda.js`, we export function that will process the incoming request. It extracts `type`, `id`, and `action` we’ve specified in the link and calls the handler function to receive HTML.

If something went wrong, we return `400`. If an error hasn’t thrown intentionally, we report it to Sentry.

```js:title=lambda.js
const Sentry =  require('@sentry/node')

const handler = require('./handler')
const { BadRequest } = require('./errors')

Sentry.init({ dsn: process.env.SENTRY_KEY })

exports.handler = async ({ path }, context, callback) => {
  try {
    const [type, id, action] = path.split('/').slice(1)
    const body = await handler(type, id, action)
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body
    })
  } catch (error) {
    const isBadRequest = error instanceof BadRequest
    if (!isBadRequest) {
      console.log(error)
      Sentry.withScope(scope => {
        scope.setExtra('path', path)
        Sentry.captureException(error)
      })
      await Sentry.flush(2000)
    }
    callback(null, {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/html'
      },
      body: isBadRequest ? error.message : 'internal error'
    })
  }
}
```

Implementation of the handler function we can find [here](https://github.com/RodionChachura/email-unsubscribe-lambda/blob/master/lambda/src/handler.js). It checks if a request is valid, updates the user, and returns appropriate HTML.

## Infrastructure

You can find everything related to the infrastructure in the repository [here](https://github.com/RodionChachura/email-unsubscribe-lambda/tree/master/infrastructure). Very similar infrastructure has already covered in other stories — [AWS for Website CI/CD with Terraforms](https://medium.com/@geekrodion/deploying-spa-on-aws-with-terraform-codepipeline-6290529c24df) and [Amazon DocumentDB and AWS Lambda with Terraform](https://medium.com/@geekrodion/amazon-documentdb-and-aws-lambda-with-terraform-34a5d1061c15). Therefore we will only cover variables here.

To create the infrastructure, we need to set environment variables(AWS credentials) first.

```shell{promptUser: ''}
export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
export AWS_REGION=<YOUR_AWS_REGION>
```

In `vars.tf`, we specify all variables we need to create resources on AWS.

```hcl:title=vars.tf
variable "name" {
  default = "pomodoro-subscriber"
}

# OPTIONAL:

# if you use Sentry for errors reporting
variable "sentry_key" {}

// if you have a domain
variable "domain" {}
variable "zone_id" {}
variable "certificate_arn" {}


# if you want to use AWS CodePipeline for CD
variable "ci_container_name" {}
variable "repo_owner" {}
variable "repo_name" {}
variable "branch" {}
```

The only required variable here is the name that we will use in almost every resource.

Everything else is optional, if you are using Sentry, you can specify `sentry_key`.

If you have a registered domain and certificate for it, you can specify set values for these variables: `domain`, `zone_id`, and `certificate_arn`.

If you like an idea of using AWS CodePipeline for CI/CD and have your code in the GitHub repository and have a Docker container in the AWS ECS registry, you can also specify the last four variables. Also, you will need to set the token as an environment variable. It quite simple to get, you can find steps [there](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

```shell{promptUser: ''}
export GITHUB_TOKEN=<YOUR_GITHUB_TOKEN>
```

To find more information about the CD part, you can check [this story](https://medium.com/@geekrodion/deploying-spa-on-aws-with-terraform-codepipeline-6290529c24df).

We can specify variables by editing a file or by setting environment variables like this.

```shell{promptUser: ''}
export TF_VAR_name=<NAME_FOR_RESOURCES>
export TF_VAR_docdb_password=<PASSWORD_FOR_AMAZON_DOCUMENTDB>
export TF_VAR_certificate_arn=<YOUR_DOMAIN_SERTIFICATE_ARN>
export TF_VAR_zone_id=<YOUR_DOMAIN_ZONE_ID>
export TF_VAR_domain=<YOUR_DOMAIN>
```

Now let’s run those two commands to create resources.

```shell{promptUser: ''}
terraform init
terraform apply
```

That’s it. The only thing left is to update the function name in [the deployment script](https://github.com/RodionChachura/email-unsubscribe-lambda/blob/master/lambda/management/deploy.sh#L8).