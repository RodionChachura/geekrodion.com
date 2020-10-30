---
date: "2018-03-17"
title: "Distribution Function with Python"
shortTitle: "Distribution Function"
partNumber: 7
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

In the previous part, we have seen a discrete random variable and distribution row. For a continuous random variable, there is no such thing as distribution row. But we have common characteristic for both discrete and continuous random variable — **distribution function**.

![probability distribution function](function.png)

If you work with discrete random variables you can easily build probability distribution function this way:

![](build.png)

The distribution function of any discrete random variable is always a discontinuous step function, the jumps of which occur at points corresponding to possible random values of the quantity, and are equal to the probabilities of these values. The sum of all the jumps of the function *F(X)* is equal to one. As the number of possible values of the random variable increases and the intervals between them decreases, the jumps become larger, and the jumps themselves become smaller, the stepped curve becomes smoother, the random variable gradually approaches a continuous value, and its distribution function — to a continuous function. The most important points you need to understand about distribution function is that it is always a monotonically increasing function and the maximum value of this function equal to *one*.

Let’s show this on example:

`gist:dedc89da2b88f650f0f5002e2f59c393`

Sometimes you can find a random variable where distribution function in some places has a breakpoint, this random variable called **mixed random variable**. For example, imagine that you have your morning running routine. If you didn’t stop at running you will have continuous distribution function of your time running during some period of time. But if you stop somewhere you will have a breakpoint and continuous-discrete variable become mixed.
