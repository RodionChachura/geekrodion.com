---
date: "2020-11-20"
title: "How to Move Blog Posts From Medium to Gatsby"
description: "Stop being confined by Medium - make a better blog with Gatsby"
category: "programming"
keywords: [Gatsby, React, Medium, Blogging]
featuredImage: main.png
resources: [
  GitHub https://github.com/RodionChachura/booksconcepts.com BooksConcepts,
  GitHub https://github.com/RodionChachura/geekrodion.com GeekRodion
]
---

![](/main.png)

In the story, I will explain how I moved all my posts from Medium to Gatsby website so that you could do the same in less time.

## Why Did I Move Everything From Medium

My first post appeared on Medium back in the Summer of 2017. I was trying to add JWT authorization to an ASP.NET back-end by following complicated tutorials. In the end, I completed the task with a more straightforward implementation and decided to post it on Medium.

As I continued working at my job, studying at university, and making side projects, the number of Medium posts grew. After years of writing on the platform, I decided that it is time to move everything to my websites because of several reasons.

#### 1. Medium Partner Program

At some point, Medium introduced a program that allowed writers to make money from their writing. To receive royalties from a post, you could ask for a review, and once the post is approved, it will get promoted and become available only to subscribers. If somebody will find it organically, and he opened Medium three times already in a given month, the platform won't show your post.

Once I learned about the program, I get excited - let's make some money on Medium! I went to the "Medium Partner Program" page...

![No Stripe - No Money](/countries.png)

I was in Belarus, and there is no Stripe in Eastern European countries - I couldn't make money from my writing.

#### 2. No Support For Series

Most of my posts are parts of the series, like "[Snake Game With Rust, JavaScript, and WebAssembly](https://geekrodion.com/blog/rustsnake)" or "[Probability Theory and Statistics with Python](https://geekrodion.com/blog/probability)." To provide this type of content on Medium, I had one story with links to all parts, and all the other posts with links to the index, next and past piece. It was looking poorly and was hard to maintain.

#### 3. Hard to Promote Anything

At the same time as I write on Medium, I also develop a productivity app - [Increaser](https://increaser.org). To promote the product, I added a short sentence about the app alongside a gif so that readers that are interested in getting more effective could find a valuable tool.

But what if you want to promote another product, or you want to change the text or gif? In this case, you will manually go over each page and update every post. There is no API to help you. The last time I had to change the gif, I decided to automate the process and spend two days to make a [program](https://github.com/RodionChachura/medium-updater) that goes over each post and update it in the browser.

After realizing that I have so little leverage with the platform and that it is so easy to make your custom blog with Gatsby, I decided it is the time to move.

## Programmatically Moving Posts From Medium to Gatsby

Besides having posts on programming, productivity, and product, I also had book summaries that didn't belong in Medium and deserved a beautiful minimalistic website. Summaries posts share the same format and don't have complicated elements, so I decided it would be easier to move them programmatically and began with a website for books. Then I will add a blog section to my website, to which I will move all the other posts.

Once I had a new Gatsby project, I went to the [Medium export URL](https://medium.com/me/export) and got all my posts in a zip archive.

We could describe the whole process of converting raw HTML posts to Gatsby-ready Markdown with one script.

```shell:title=cook_medium.sh
unzip medium-export.zip -d medium-export
mv medium-export/posts posts
node filter-posts.js
medium2gatsby books_posts -o content/blog -t template.js -d
```

There is a Medium post with the list of summaries that the [filter-posts.js](https://github.com/RodionChachura/booksconcepts.com/blob/master/filter-posts.js) script will convert to a [JSON file](https://github.com/RodionChachura/booksconcepts.com/blob/master/content/blog/index.json). We will need it later to render the list of summaries in the same order as they are on Medium. Then it will go over each summary post, rename files, and change HTML. The last step is to use a [library](https://github.com/jamischarles/export-medium-to-gatsby) that will convert Medium posts to markdown.

![Medium Post with Links](/books.png)

## Manually Moving Posts From Medium to Gatsby

The automation worked pretty well for summaries, but at the same time, they had a pretty simple format. The blog posts and series are a little bit tricky. It is possible to automate the process for this task, but since I need to do this only once, and it had a lot of edge cases, I went with a mostly manual process. To receive the markdown version of the post, I used the [mediumexporter](https://github.com/xdamman/mediumexporter) library.

I decided to keep the meta section of the blog minimalistic, to have buttons on the right side with a link that the reader most likely would like to visit - there is a list of resources in meta.

```md
---
date: "2018-05-22"
title: "Deploy Jupyter Notebook to AWS Lambda"
description: "These days it is possible to deploy a function from Jupiter Notebook in less than a minute."
category: "programming"
keywords: [AWS Lambda, Jupyter Notebook, Python, DevOps, Terraform]
featuredImage: main.png
resources: [
  GitHub https://github.com/RodionChachura/deploy-notebook
]
---
```

If you are curious about how to manage a series of posts with Gatsby, you could explore [the repository](https://github.com/RodionChachura/geekrodion.com) and find answers there!

## Canonical Links

I didn't delete my old stories from Medium after I moved everything, and I think you will also want to keep your old posts on the platform. When you have the same content on two websites, it is crucial to explain to Google Search that the content on your website is the main one. To do this, you need to set a canonical link on every page, copy it, and go to Medium advanced settings for the post. In BooksConcepts, I used [a plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-canonical-urls) to set a canonical link on every page.

![Medium Advanced Settings](/canonical.png)

There are more topics worth covering, but I wanted to keep this post short. You could fill up the gaps by exploring repositories or by reaching out to me. I hope this post was helpful to you!