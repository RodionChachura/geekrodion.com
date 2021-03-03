---
date: "2021-03-03"
title: "Why I Gave up on the Job Board"
description: "Think about market, distribution, and business model before starting"
category: "product"
keywords: [Idea Validation,First Principles]
featuredImage: main.png
---

![](/main.png)

Recently I decided to give up on my side project - a jobs aggregator for remote react developers. I worked on it for a month and a half and invested 41 hours of work into it. Could I validate the idea faster? Let's find out.

## The Problem and Existing Solutions

One of the frustrations I had while looking for a remote job was filtering positions. Usually, I would spend a few hours every week checking various websites and apply to few jobs. It takes time to get from a pile of positions to a few that much your location, skills, experience, and level of creepiness.

Previously I would jump into it without any research. But now I'm an old guy. It isn't easy to start something new. I need to do analysis-paralysis first.

These days newsletters are a growing trend. I tried a few of them but was disappointed. RemoteLeaf seemed to be prominent, but I received very few jobs that matched my criteria and canceled the subscription after the first month. The product captures two trends at once. I believe it has a huge potential if the founder will leverage technology or human resources to collect and parse jobs. Then I went to a GitHub repository with resources related to the remote job. There were a few promising aggregators, but still, they either didn't have enough filters or postings.

I didn't find a resource that would solve my problem and decided to give it a shot. First, I listed upsides, downsides, and potential business models.

## Upsides

- Possibility to achieve this year's goal of 1k MRR.
- Get better at design.
- Add a project to a portfolio.
- Have tools that will allow pivoting in the remote jobs industry
- Get a better understanding of the remote jobs industry.
- Find a high-paying job.
- Easy to scale to other markets by leveraging tools.

## Downsides

- Spend a lot of time building the website.
- Spend a lot of time processing jobs.

## Business Models

- Paid job posts.
- Paid newsletter.
- Affiliate links to educational content.
- Educational content.

In the first two weeks, I built an MVP and filled it up with jobs. On the technical side, the project didn't have anything that complicated. I used Gatsby and Tailwind to build the website. It took the jobs from the DynamoDB database during the build phase. How did I gather jobs into the database? Well, I made a Chrome extension. When I open a page with a job, it could collect information like position name and location restrictions, while I pick up the rest.

I collected jobs from the websites I used before: WeWorkRemotely, RemoteOK, and AngelList. There are plenty of resources out there, yet I decided to stick with the minimum for an MVP.

Once I had a ready-to-use MVP, I got a bit confused. What should I do next? How do I get developers to use it? Should I try to do marketing? Before trying to do something with mystical marketing I went to check on the first principles.

## Market

Is there is a market for this product? To find out, I went with an approach from "The Mom Test" book, asking if people have a problem without mentioning the product.

First, I went on Reddit, but I had no traction there. Yet, there is a better place to find React developers - LinkedIn. I started messaging people from different countries, and after getting around thirty conversations I had a better grasp of the problem.

I found out that the majority of people find a remote job on LinkedIn. A lot of devs don't even search on the platform, recruiters find them. Also, there is usually some regional website, where they could find a remote job in their country. I also got to know that most developers get a job pretty fast, without going through many interviews.

We didn't even get to distribution channels yet, but we already could see that the idea is, well, shitty. But Rodion, you do have the problem, shouldn't there be other folks like you? Sure, but how many senior React developers, that have a hard time being in the office, that are looking for a highly paid remote job while living in a country with a tricky timezone out there? Maybe three or ten.

Another interesting question is how often do they have the problem? Most likely for a month every two years.

Niching down is good, but not too much, where there are you and a few other people.

## Distribution and Business Model

With a broken market part, it is doesn't make sense to go further. Yet let's take a look, assuming there is a market.

Like with any other product, the goal is to get to the point when customers market it for you with word of mouth. Of course, assuming the product is so good, people share it. Again if the market is too small, the person won't have anybody in their network who has the same problem.

To get in front of customers, we need to figure out a distribution channel or two. The obvious answer could be SEO, but it is a bit tricky for an aggregator since it would have no original content. It doesn't mean there is no way to get on the front page of Google tho. We could write articles for remote React developers, have pages with the most common interview questions and answers, trends and statistics, cover letter templates. We could get creative, but it requires a lot of work and luck. Also, it is possible to grow an account on Twitter. Why not subscribing to good job postings. I don't think paid marketing will work there, because we don't sell anything, and the cost of developer attention will cost some money.

The most obvious business model here is selling job promotions to companies. They have a hiring budget, so if enough visitors are coming to the website, it is doable to make a buck. How much could we make from the website? Let's assume one promotion costs 200$, and we sell five items a month, then we could make 1000$/month. It is good money.

Is there is a way to grow this business? There a few ways. First, we could provide recruitment services for companies. Just look at Dynamite Jobs charging $4650 for a single hire! Making one of these businesses that charge for the value would be amazing. Think about all these real estate agents getting money for nothing!

Once you have a technology right, you could scale it up by duplicating resource for other niches - VueRemote, ScalaRemote, or SwiftRemote.

Would it be fulfilling to work on the product? The process of collecting jobs sucks. It is a dull manual job. Yet, it is possible to automate a lot, or at some moment, pay somebody to gather posts for you.

## Main Lessons

- Think about first principles first - market, distribution, business model.
- It is not enough to have a problem yourself to start a product.
- Use "The Mom Test" practices to validate the idea.
- If people use your product but don't know anybody who has the same problem as them, there will be no word of mouth.
