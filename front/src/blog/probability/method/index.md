---
date: "2018-05-07"
title: "Method of Moments with Python"
shortTitle: "Method of Moments"
partNumber: 28
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

Imagine that we have a population with a specific distribution. As we already know distribution density function have the number of parameters. There is a large number of distribution functions and each of them has a different number of parameters, however most of the time one or two. For example, normal distribution has two parameters — μ and σ, which is mean and variance, however, Poisson distribution has only one parameter — λ, which is the rate. As always in statistics task, we have data sample from this population and need to make some estimation. Since we have data sample we can calculate sample moments(numerical characteristics of statistical distribution). The most used moments are first — expected value and second — variance. Also sometimes can be used third and fourth central moments. They are — skewness and kurtosis.

**The method of moments** solves such task: calculate the parameters of the population distribution function having a distribution function and a sample data. Let’s take the distribution from one of the previous articles, calculate parameters and compare an actual distribution with one calculated with the method of moments.

`gist:6a0bc313ca20b36af8345dc802444e5f`

As you can see from the example we obtain result close to actual distribution with a small sample. In this example, we calculate only two moments since the population has a normal distribution, which has two parameters.

**The generic approach** for calculating parameters of population distribution function with *k* parameters by using the method of moments:

1. find *k* ssample moments.

1. calculate parameters of population distribution function by solving equations by using previously calculated moments.
