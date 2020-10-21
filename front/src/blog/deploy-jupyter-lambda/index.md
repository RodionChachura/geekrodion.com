---
date: "2018-05-22"
title: "Deploy Jupyter Notebook to AWS Lambda"
description: "These days it is possible to deploy a function from Jupiter Notebook in less than a minute."
category: "programming"
keywords: [AWS Lambda, Jupyter Notebook, Python, DevOps, Terraform]
featuredImage: main.png
headline: "Deploy Jupyter Notebook to AWS Lambda"
resources: [
  GitHub https://github.com/RodionChachura/deploy-notebook
]
---

![](/main.png)

More often, I find myself opening Jupyter Notebook when facing a mathematical or algorithmic problem. Maybe it is also true for you. At first, you think like: “I’ll make only the research/visualization part in a notebook and then move everything to plain python.” Yet after some time, you end up finishing the algorithm in Jupyter Notebook. A few years earlier, when there were no ”cloud lambdas,” you will end up moving code somewhere. Hopefully, these days, it is possible to deploy your function written in Jupiter Notebook in less than a minute.

## AWS and Terraform

We will use [Terraform](https://www.terraform.io/) to define infrastructure as code, so we end up making less DevOps routine. And of course, you need to have an [AWS](https://aws.amazon.com/) account.

## Steps
1. Make lambda function ready to deploy.
2. Create infrastructure with AWS Lambda and API Gateway.
3. Test our function.
4. Create a bash script for deployment.

## Function Ready for Deploy

At first, we need to add `handler` function to our notebook that will receive a request and return the result of calculations.

`gist:167b2f197bbb56ccea3843da7dbdf68d`

As we could see, the function parses JSON, run `algorithm_on_steroids`, and then return the result in JSON format. Next, we need to create a file with the name `libs.txt`. There we will add names of all third-party libs we use(`numpy`, `matplotlib`, `pandas`, …). Then we add a [bash script](https://github.com/RodionChachura/deploy-notebook/blob/master/cook_notebook.sh) that will create a `.zip` file ready to be deployed to lambda. What script does:
1. Create a directory.
2. Convert the notebook to the python file and move it to the directory.
3. Run `pip install` for each lib specified in `libs.txt`.
4. Zip folder.

##  AWS Lambda + API Gateway

To use AWS Lambda, we need to create infrastructure. It includes:
1. S3 to store the function.
2. Lambda that will run the function.
3. API Gateway to communicate with the function.

For simplicity, we will omit best practices and put everything in [one terraform file](https://github.com/RodionChachura/deploy-notebook/blob/master/main.tf). But before we could run it, we need to specify credentials in the file. Special attention to this piece of the file:

`gist:5772a3d448c7b3de399acb3b9c539605`

## Create Lambda and Test It!

Now we could open a terminal in the directory with the lambda and all files mentioned earlier.

`gist:4a4cd7a87b6325c2deda24a0de5d17a4`

Isn't it magic? Three commands and we have deployed function.After running `terraform apply` at the end of the output, we will see a green line with the URL. It is the URL we could use to run the function. Let’s test it by making a POST request.

```shell{promptUser: geekrodion}
curl --request POST --data '{"a": 3, "b": 4}' <URL_FROM_OUTPUT>/function
```

OK, but what if we make changes to the function and want to see a new version deployed? Let’s write a script for deployment.

`gist:3c9af5d6a4cdaea8f52712f4eac21be3`

Now we could run it by typing:

```{promptUser: geekrodion}
. ./deploy.sh tf-lambda tf-lambdas function.zip
```

## Conclusion

In this post, we've made the automation tool for deploying the Jupyter Notebook function. It is not ideal. For example, it would be good to add a script that will automatically find third-party libs in the notebook and add them to `libs.txt`, but this is out of the scope of this post. To delete everything we made from AWS, we can run `terraform destroy`. And poof — everything deleted from AWS. I hope this post was useful to you!