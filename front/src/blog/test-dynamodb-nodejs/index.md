---
date: "2018-01-27"
title: "Testing DynamoDB + NodeJS App"
description: "Set up continuous integration and deployment for Express application with the DynamoDB database."
category: "programming"
keywords: [CI/CD, NodeJS, DynamoDB, Bitbucket]
featuredImage: main.png
---

![](/main.png)

Do you have an Express application with the DynamoDB database and want to set up continuous integration and deployment? This article for you.

## Setting up the Testing Environment

According to the twelve-factor app, env vars are granular controls, each orthogonal to other env vars. We are going to look at the app where environment variables are the source of truth. We have three different places with env variables. First is the development environment(.env file), second is Bitbucket env variables, and the third one is AWS Elastic(staging).

`gist:36d751b3cbd8eb21aa4fa22d9b0a5b57`

Since AWS SDK has a global config object, we will run the setup code before we do any interactions with the database. It will specify credentials and point out that in a testing environment, we want to use local DynamoDB rather than a remote one.

`gist:61bd7b1614ed46a63f5b4675a7c950aa`

We launch local DynamoDB and create tables for tests before running tests. Once we executed tests, we delete the tables created before. To run these functions, we set paths to them in package.json. According to Jest documentation, both of them should return a promise.

`gist:5df4302867139b42618d259f2c04bd1b`

The logic of the setup function is pretty straightforward. If you are curious how represented tables params, check [this post](/blog/migrations-in-dynamodb).

`gist:c4b75adf7d1889d17ae326214fc69348`

We are using the same approach in the teardown function.

`gist:8f0e1dcc71790b70b99d29b2ed5611b9`

## Tests Termination

Sometimes we may abort tests before they finish running. In such cases, Jest won't execute globalTeardown. Better to delete tables first and after that create. Below you could see improved setup function.

`gist:6f1f8e5912863b6bc7ddb3abfd94ba61`

## CI/CD

This time for continuous deployment, we will use Bitbucket pipelines. In pipelines, we need to download java and some packages required for AWS deployment.

`gist:f2a2da8e8fd67fe7a32a74c4062fcb0f`

To optimize pipeline execution time, we could make a Docker image with the required packages.

`gist:c235b899caecca868e65ce53a56ad5b2`

I was lazy to download and configure docker on a local machine. Hopefully, there is a service on the Google cloud platform — Container Registry.

`gist:3dee4a5684204787bf543fb2abdf5162`