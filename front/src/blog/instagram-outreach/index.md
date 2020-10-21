---
date: "2019-02-01"
title: "Instagram Outreach with Python"
description: "Half-Automated Instagram Marketing: What I learned after writing 1000 DMs"
category: "programming"
keywords: [Instagram, Python, Automation, Outreach]
featuredImage: main.jpeg
headline: "Instagram Outreach with Python"
resources: [
  GitHub https://github.com/RodionChachura/instagram-promotino
]
---

![](/main.jpeg)

Recently I released the second iteration of [Increaser](https://increaser.org). After a week of not coding any features for it, I decided to come back and implement a few. But the problem arose. There were not so many people using an app, and I didn’t know what the features they would like to see. So I decided to gather feedback some way. I wanted to know what other peoples see lacking in the app and what can be improved.

## DMing Strangers on Instagram

The first thing that comes to mind was to start making DMs on Instagram. I selected a few hashtags, such as #pomodorotechnique, #programming, #coding, #studying, went to the search page, and start messaging.

![initial message](/message.png)

The first days it was a fun thing to do, and messages like this were quite encouraging.

![response](/response.png)

After a few days yet I faced a problem. After scrolling the feed, opening the author profile, clicking on the message button, appears that I already tried to reach him. So I started thinking about how I could automate this manual process.

## Process Automation

The only way you can type a message on Instagram is by using a mobile app. And efforts to make such automation not worth it. The only part worth automation is the process of finding peoples to reach.
The first thing that came to mind was the Instagram API or Instagram Graph API. But after some investigation, it has become clear that there is no way to use APIs. The first one is deprecated, and to use the second one, you need to apply with a real application.
The only way left is scraping. After some research, I found a python library for making all kinds of things with a browser version of Instagram. After some playing with the library, I came to the algorithm that has such steps:
1. Login on Instagram.
2. Shuffle array of tags.
3. Go to the search page and try different tags, for each profile on the feed check if a user not reached or ignored, add to the list and like the post.
4. Subscribe to each profile since it will be easier to find in subscribers rather than in global people search.
5. For each profile prompt me to move it to one of the two categories — reached or ignored.
6. Unsubscribe from peoples in the list.

Information about users saved to `.json` file after execution. Since I already wrote to 200-something peoples, it took me two hours to fill the initial state.

![state](/state.png)

The state keeps in reached array both username and tags of the liked post. This information allows me to write the script that will go over users that answered my message and count the number of occurrences for each tag. It allows me to find new tags for the search process.

![program run](/run.png)

## Conclusion

It took me a good piece of time to write messages to 1000 peoples to receive only 10 responses.

![time investment](/time.png)

I received some useful feedback, and it gives me an idea of what features I should implement. But I doubt that this way of getting feedback can be effective. Maybe I will optimize this script a little bit in the future before running a new session of reaching out.