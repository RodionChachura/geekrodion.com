---
date: "2018-03-17"
title: "Random Variable, Distribution of the Discrete Random Variable With Python"
shortTitle: "Random Variable, Distribution of the Discrete Random Variable"
partNumber: 6
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

**Random variable** — is a variable whose possible values are outcomes of a random experiment. For example the number of hits during the three shots(*0, 1, 2, 3)*, or sum of the upward face after rolling 5 dice(5 … 25). This is examples of **discrete random variables**, variables with a fixed amount of possible values. Another type is **continuous random variable** — the variable that can take any value on the interval. For example, speed or mass of some random object.

```py
import random

discrete_variable = random.choice(['head', 'tail'])
# tail
continuous_variable = random.random()
# 0.8902011603082036
```

Let’s take a closer look at discrete random variables. The discrete random variable has a number of possible values, each value has it is own probability. Since events are a mutually exclusive sum of all their probabilities equal to one.

![](sum.png)

A random variable will be completely described if we specify distribution — probability for each event. This way we can specify the Law of distribution of the discrete variable.

**The law of distribution of a random variable** is any relation that establishes a connection between the possible values of a random variable and the corresponding probabilities.

`gist:693103ff582ea7936e53821500b0d551`

Example. Some shooter fires on the target until the first hit and he has 4 shells. Probability of hit is 0.6. We should find the distribution of unused shells.

`gist:950f3c147173012cc4a9e908b3d64635`
