---
date: "2018-03-20"
title: "Poisson Distribution With Python"
shortTitle: "Poisson Distribution"
partNumber: 13
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

**The Poisson distribution** is a discrete probability distribution that express the probability of a given number of events occurring in a fixed interval of time, distance, area or volume if these events are independent and the probability that an event occurs in a given length of time does not change through time. Then random variable X, the number of events in a fixed unit of time, has a Poisson distribution. Lambda is an average number of events occurring in the specified period of time.

![probability that event occurs x number of times](probability.png)

Let’s take a look at the example. Some pizzeria receives an average of 20 orders per hour. Considering that the number of orders in any part of the time is distributed according to Poisson distribution, find the probability that in just two minutes the pizzeria will receive exactly two orders.

`gist:f18aa81f9df37d584260f2229ca271ef`

As you can see chart have right skewness and probabilities going down after reaching maximum. Poisson distribution will always have right skewness, but it depends on the value of lambda if lambda is large distribution will be close to symmetric. We can show it using the previous example by changing the average number of orders.

`gist:7ac64413611d1561c546cc4cc59ffe76`

Let’s take a look at the characteristics of the Poisson distribution. The mean and the variance:

![](characteristics.png)
