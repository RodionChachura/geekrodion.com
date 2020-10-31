---
date: "2018-05-02"
title: "Inferential Statistics and Point Estimation Distribution with Python"
shortTitle: "Inferential Statistics and Point Estimation"
partNumber: 27
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

The largest part of statistics is about taking a sample from the population and using those as an estimation of the overall population. The idea of point estimation is to calculate a single value(statistic) by using sample data from the population. For example, it can be inference about the quality of some products based on sample data observations.

Example. Figure out if the quality of the product good enough by having sample data from the normally distributed large population.

For this example, we generate *10000* normally distributed values with a mean equal to *40* and then find the point estimator — sample mean of the sample with the size equal to *40*.

`gist:cb78dc3409dedf25f12b6c41eacff672`

When we don’t know parameters of the distribution, such as mean or standard deviation, we can make an estimation about these parameters by calculation **point estimators, such as the sample mean or sample standard deviation**. And we should remember that point estimates are never perfect since we working only with a relatively small sample of the population. This is commonly referred to as the **margin of error**. And this error component is expressed as a **confidence interval**(which will be explained in the next articles).
