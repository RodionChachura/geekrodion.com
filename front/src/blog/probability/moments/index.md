---
date: "2018-03-19"
title: "Moments, Variance, Standard Deviation With Python"
shortTitle: "Moments, Variance, Standard Deviation"
partNumber: 10
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

In the [previous post](/blog/probability/expected), we had a look at characteristics, that shows the position of a random variable on the numerical axis. But there is also a number of characteristics which describe certain distribution properties — **Moments**. Most of the time we will deal with two types of moments — initial and central.

The **initial moment** of the *s-th* order of a discrete random variable X is a sum of the form:

![the initial moment of the *s-th* order of a discrete random variable](expected.png)

For continuous random variable we have:

![the initial moment of the s-th order of a continuous random variable X](continuous.png)

As you can see that the first initial moment is expected value. Also for the initial moment, we can join two previous formulas in one.

![the initial moment of the s-th order of a random variable X](initial.png)

Let’s see how distribution function will change according to the expected value.

`gist:d404724b4a2f9b80bf39f005b2a04e23`

Before we approach central moment we introduce the central random variable. For random variable X with expected value m. **Central random variable** is deviation of a random variable from its expected value:

![central random variable](central.png)

Thus, the central moment of the *s-th* random variable *X *is the expected value of the *s-th* degree of the corresponding central random variable. For a discrete random variable:

![the central moment for a discrete random variable](discrete.png)

And for continuous random variable:

![the central moment for a continuous random variable](moment.png)

A very important characteristic is the second central moment — Variance. **Variance**is characteristic of dispersion, scatter of values of a random variable near its expected value.

![variance](variance.png)

Let’s see how distribution function will change according to the expected value.

`gist:0c979cc2d7eed69a6734a18c60c1ec71`

For a visual characteristic of dispersion, it is more convenient to use a quantity whose dimension coincides with the dimension of the random variable. To do this, a square root is extracted from the dispersion. The value obtained is called the **standard deviation**. In practice, you will see a standard deviation more often then variance.

![standard deviation](standard.png)

```py
from math import sqrt

def expected_value(values, probabilities):
    return sum([v * p for v, p in zip(values, probabilities)])

def standard_deviation(values, probabilities):
    m = expected_value(values, probabilities)
    return sqrt(sum([(v - m)**2 * p for v, p in zip(values, probabilities)]))

values = [1, 2, 5, 3, 8, 4]
probabilities = [.1, .2, .4, .1, .15, .05]

standard_deviation(values, probabilities)
# 2.1354
```

Expected value, variance and standard deviation — the most commonly used characteristics of a random variable. They characterize the most important features of the distribution: its position and degree of dispersion. For a more detailed description of the distribution, higher-order moments are used. But they are out of the scope of this article.
