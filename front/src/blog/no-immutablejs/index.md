---
path: "/no-immutablejs"
date: "2018-02-25"
title: "Why You Don’t Need ImmutableJS"
description: "It is easier than ever to write immutable JavaScript code without libraries"
category: "programming"
keywords: [JavaScript, Immutability, Redux, React]
featuredImage: main.png
headline: "Why You Don’t Need ImmutableJS"
---

![](/main.png)

Before I start working on a real front-end app, I didn’t know much about immutability or functional programming. Yet after spending some time developing with React and Redux, I started to notice that the practice of making everything immutable makes your life simpler. You are not worrying about the state of your objects anymore, and when you make operations with them, you don’t think about whether or not it will change. In the first front-end project I worked in, they were using ImmutableJS. I wasn't proficient at JS and Redux, so I decided to ask why the team using the library. They told me it easier to manage state when you use ImmutableJS. But it wasn't that. After spending time working on the app I start understanding that there are not that many benefits in using the library.

## Why ImmutableJS

When we decide to use a library, it is better to think if it is worth including it in your tools box. As more libraries you use, the more often you will find yourself in documentation pages. For example, the redux-act library is quite helpful in large projects with a lot of actions and reducers — it makes your programming life simpler since you don’t need to type redundant code. Otherwise, the Axios library will not help you much because all this functionality can be replaced by plain JS fetch.

ImmutableJS has a big API for making your objects immutable, while it is easier to keep objects immutable without the library, with plain JavaScript. Also, the library may affect your whole codebase. When you make the state an immutableJS object you will find yourself converting it to plain JS object in components or will end up using it everywhere. It makes your code messy - in one area, you convert the Immutable object to plain JS, and in other — not.

One of the main reason for using ImmutableJS it is a performance. But if we don't build a rocket-science app, these speed benefits won't get noticed.

## Vanilla JavaScript

It is better when the project written without typed language has some conventions that will be respected by the team. The first one is to make everything reasonable immutable. For arrays, we could forget about loops, push()-like methods and mutate by index. If you find yourself writing a loop, think about how you could write it using array methods such as `map` or `reduce`. If you want to push something — create a new array:

`gist:bd2f9a01311560305c51c264d4d3baf9`

If you work with objects, you could stick to the approach below.

`gist:cf2d81bd83452ed959209b37eabf6844`

If you work with complex objects, most likely, you will use classes that are easy to keep immutable too. We could return a new object or immutable type from every method. For example, we could look at the `Point` class.

`gist:4891be4ae3151d4e6fc1be2ceea90e30`