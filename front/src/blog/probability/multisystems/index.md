---
date: "2018-03-25"
title: "Multivariate Random Variable - Dependent and Independent Systems of Random Variables with Python"
shortTitle: "Multivariate Random Variable - Systems of Random Variables"
partNumber: 20
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

In [the article about distribution function](/blog/probability/multidistribution), we came to the conclusion that it is possible to find the distribution functions of random variables of a vector by having the distribution function of the system.

![the distribution function of random variable](function.png)

Also, we can find probability density of random variable by knowing probability density of the vector.

![probability density of the random variable](density.png)

By using this formulas we can find distribution function or probability density function of a single random variable. But is it possible by knowing distribution functions of separately taken random variables form distribution function of a system? It turns out that in general case this can’t be done. In order to describe a system of random variables we also need to know relationships between variables. We can describe such relationships by using conditional probability distribution.

A conditional probability distribution of random variable *X* of a system *(X,Y) *is such distribution, where other random variable *Y *took specific value *y*.

![conditional probability of random variable](conditional.png)

In some cases, the dependence between variables can be so close that by knowing the value of one random variable you can find the value of other. In other cases dependence between variables so week that you can call them independent.

Random variable Y is independent of random variable X if the distribution of random variable Y independent from what value take X.

![the random variable is independent](independent.png)

And if Y depends on X:

![the random variable is dependent](dependent.png)

For independent continuous random variables we can find probability density by multiplying probability densities of separate random variables:

![probability density of the system](probability.png)