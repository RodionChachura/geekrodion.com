---
date: "2018-03-18"
title: "Expected Value, Mode, Median with Python"
shortTitle: "Expected Value, Mode, Median"
partNumber: 9
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

At this part, we will look at characteristics that show the position of a random variable on the numerical axis. All these characteristics have there are own real-life applications. And you will see them very often not only in probability theory domain but also in statistics, machine learning, and other fields.

One of the most important characteristics is the **expected value** — the sum of the products of all possible values of a random variable by the probabilities of these values.

![the expected value for a discrete random variable](expected.png)

```py
def expected_value(values, probabilities):
    return sum([v * p for v, p in zip(values, probabilities)])

expected_value([1, 2, 3], [0.2, 0.3, 0.5])
# 2.3
```

The expected value for a continuous random variable is integral, where f(x) is probability density function:

![the expected value for a continuous random variable](formula.png)

This formula is obtained from the formula listed above. We just replace components:

![](components.png)

For mixed random variables, we have a formula, where sum used for all breakpoints and integral for all parts where the distribution function is continuous:

![](sum.png)

Next characteristic is **Mode**. for a discrete random variable mode is the most probable value, and for continuous is a value where probability density is the biggest.

`gist:3194638158ecc4ede65c2c376c7624b3`

The last characteristic we cover in this article is the **Median**. Median of a continuous discrete random variable is such a value *m*, for which:

![](median.png)

If we look at the curve of continuous random variable it will be the place which separate curve on two parts with the same area:

![a median split curve in two parts](curve.png)
