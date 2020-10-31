---
date: "2018-03-25"
title: "Multivariate Random Variable - Probability Density with Python"
shortTitle: "Multivariate Random Variable - Probability Density"
partNumber: 19
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

Introduced in the previous article characteristic of the system — the distribution function — exists for random vectors of both continuous and discrete variables. But the main practical significance is the vector of continuous random variables. The distribution of the continuous random variable is usually characterized not by the distribution function, but by **distribution density**.

For random continuous variable probability density function is the limit of the ratio of the probability of falling into the small section to the length of the section when it tends to zero. Similarly, we can define the distribution density of a vector of two random variables.

![probability density](formula.png)

By using this formula we can represent the probability of falling in the rectangle from the previous article in a new way:

![probability of falling into rectangle](probability.png)

Let’s use this formula in the abstract example. We have two variables with density function. What is the probability of falling into the rectangle?

```py
from scipy.integrate import dblquad
from math import pi

# abstract density function
def density_function(x, y):
    return 1/(pi**2*(1 + x**2)*(1 + y**2))

dblquad(density_function, 0, 1, lambda x: 0, lambda y: 1)[0]
# 0.0625
```
