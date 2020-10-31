---
date: "2018-03-20"
title: "Binomial Distribution With Python"
shortTitle: "Binomial Distribution"
partNumber: 12
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

**The binomial distribution** is the distribution of the number of successes in a sequence of n repeated Bernoulli trials. Repeated Bernoulli trials mean that all trials are independent and each result have two possible outcomes. Random variable X represents the number of successes in n trials. Now we can construct the formula.

![probability of getting x successes](binomial.png)

If you follow the series up to this point you can mention that this formula was explained in the [“Repetitive experiments”](/blog/probability/repetitive) part.

Let’s take a look at the classic example. Imagine that you tossing coin 20 times. What the probability that you will have exactly 6 tails?

`gist:e6749d13e6f24e3a8c0c1833fa21bb63`

As you can see from chart probability that you have 6 tails is equal to the probability that you will have 6 heads. This is because you have mirroring probabilities.

Let’s take a look at the characteristics of the binomial distribution. The mean and the variance:

![](characteristics.png)
