---
date: "2018-04-17"
title: "Empirical Distribution Function with Python"
shortTitle: "Empirical Distribution Function"
partNumber: 24
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

Let’s assume that we studying some random variable *X* with unknown distribution law and we need to find one. In order to find this distribution law, we need to make some number of independent experiments over this random variable. Results of these experiments are **simple statistical series**. By using this data we can make **empirical distribution function**. This cumulative function is a step function that jumps up by *1/n* at each of the *n* data points. Its value at any specified value of the measured variable is the fraction of observations of the measured variable that are less than or equal to the specified value. In order to find the value of empirical distribution function for specific value x, we should calculate the number of experiments in which random variable *X* had a value less than *x* and divide on a total number of experiments.

Let’s take a look at an example. We roll the dice *100* times. How will look empirical distribution function?

`gist:039a3fcdcfaa49616753f607928cf777`

By increasing the number of experiments empirical distribution function comes closer to the real distribution function.

In the previous example, the function looks close to the real distribution function. But if we increase the number of experiments we can obtain a much better result.

`gist:6853865542e04e9e7cf1a95049e8be53`

If *X* is a continuous random variable, by increasing the number of experiments we increase the number of function steps, so the step of function decrease and empirical function approaches a smooth curve — real distribution function of random variable *X*. I have shown this in [the article about distribution functions](/blog/probability/distribution).

