---
date: "2017-07-12"
title: "ASP.NET Core + JWT"
description: "How to setup JWT token authorization for ASP.NET Core"
category: "programming"
keywords: [Asp.NET Core, JWT, REST API, .NET]
featuredImage: main.png
headline: "ASP.NET Core + JWT"
---

![](/main.png)

There is a lot of tutorials about authentication in ASP.NET. But almost all of them have too much code and words. In this tutorial, I will show how to make [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1) with [JWT](https://jwt.io/) in an easy way.

First, add this piece of code to the `Configure` method of `Startup` class before the `app.UseMvc()`. It will apply JWT authentication middleware for your app.

`gist:52d651a66beb28c2d2a2dfceaae2cf6f`

Use the method below to generate a token. It will save `id` in the token payload and will make the token valid during the specified time.

`gist:03ebf1db13678bbed6a6d4cece68d428`

Put `[Authorize]` attribute above the controller in which you want an authorized user. To take user's id inside a controller:

`gist:f21125c3873777e2c75bf91478a1b5dd`
