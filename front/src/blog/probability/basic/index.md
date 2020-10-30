---
date: "2018-03-09"
title: "Event, Probability and Types of Events"
shortTitle: "Basic Concepts"
partNumber: 1
description: "Complete 35 Parts Course for Programmers With Python Examples in Jupiter"
category: "programming"
keywords: [Probability, Statistics, Data Science, Python, Jupiter]
featuredImage: ../main.jpeg
---

![](../main.jpeg)

Probability theory is a significant branch of mathematics that has numerous real-life applications, such as weather forecasting, insurance policy, risk evaluation, sales forecasting and many more. Central subjects in probability theory include discrete and continuous random variables, probability distributions, stochastic processes, which provide mathematical abstractions of uncertain processes and good knowledge of those subjects will help you with understanding other related areas such as statistics, finance, artificial intelligence/machine learning, game theory.

In the first part of the course, we will go through the basics definitions of probability theory.

**Event** — is a set of outcomes of an experiment to which a probability is assigned. For example, when we tossing the coin there are two possible outcomes — observe and reverse. Thus we have two possible events.

![two possible events in case of tossing the coin](events.png)

**Probability** — is a measure of a likelihood that event will occur — a number from **0** to **1**. For example, if we roll the dice probability of getting *3* points will be *1/6*, since there are *6* possible outcomes and each has the same likelihood.

![probability of an event](probability.png)*probability of an event*

**Collectively exhaustive events** — a set of events where at least one of the events will occur. For example, when rolling dice, the outcomes *1, 2, 3, 4, 5*, and *6* are collectively exhaustive, because they encompass the entire range of possible outcomes.

**Mutually exclusive events**— are events that cannot both occur. For example, when rolling dice, there is no possibility of getting both 2 and 3 points.

**Equally likely events**— are events that have the same probability to occur. If we take our dice, all outcomes have the same probability. You can’t say that more likely you will get 3 points rather than 2.

```py

def probability(outcomes):
    return 1/len(outcomes)

probability([0, 1])
# 0.5
```

Now, with an understanding of an event and probability let’s go to the next part and see how we can make operations on events.
