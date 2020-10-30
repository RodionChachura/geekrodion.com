---
date: "2018-03-18"
title: "Probability Density Function With Python"
shortTitle: "Probability Density Function"
partNumber: 8
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

The probability density function is a derivative of the distribution function, which characterizes the density with which the values of the random variable are distributed at a given point.

![](function.png)

Let’s take a look at the simple example. We have distribution function and we should find the probability of falling in the interval between a and b. This probability is simply area lying under the curve from a to b. In order to find definite integral, we will use a magic function from numerical analysis domain:)

`gist:3ca61dfccb62f37780eba6da7e3d7070`

If we have distribution function only we also can find the probability of falling into the interval.

![probability of falling into the interval from x to x + Δx](probability.png)

![find the probability both way](find.jpeg)
