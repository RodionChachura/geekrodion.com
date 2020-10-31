---
date: "2018-03-24"
title: "Normal Distribution With Python"
shortTitle: "Normal Distribution"
partNumber: 16
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

**The normal distribution** is a very important continuous probability distribution because a lot of data can have *almost *normally distributed values. The probability density function for normal distribution looks scary, but we will work only with two parameters — mean and variance.

![the probability density function for normal distribution](density.png)

By changing variance we can get quite different distributions. Let’s see for example.

`gist:b0373fd3e5a96b5a4f9f64c784e47749`

As we increasing standard deviation our distribution becomes “wider”. By changing mean we will “move” distribution because mean in standard deviation equal to the median and it is a peak of the bell curve.

In order to find the probability that value will occur in the specific interval, we should calculate an area of the interval laying under the curve — solve a definite integral. In order to find this integral, we can use numerical analysis magic.

`gist:0093d7435fbc12ab27ef814c4cc85377`
