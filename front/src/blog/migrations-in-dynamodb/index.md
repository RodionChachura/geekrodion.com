---
path: "/migrations-in-dynamodb"
date: "2018-02-26"
title: "Migrations in DynamoDB with NodeJS"
description: "Migrate DynamoDB items to a new format with async functions."
category: "programming"
keywords: [DynamoDB,Database,NodeJS,DevOps,AWS]
featuredImage: main.png
headline: "Migrations in DynamoDB with NodeJS"
---

![](/main.png)

When you work with frameworks such as ASP.NET or Django, ORM (Entity Framework, Django ORM) magically creates migration, and with DynamoDB, it may seem strange that you need to write migrations by yourself. But it is the price of using NoSQL and rejecting ORMs, but don't worry, managing migrations by yourself isn't that scary.

## Create and Delete Tables

The first step is to check which tables were created and which ones were deleted. In order to do this, I compare DynamoDB tables' names with my list of tables parameters. After that, I execute operations that will delete and create tables if needed.

`gist:0f86b729b448b6312708aac1d6eff1a6#prepareDB1.js`

In order to see which migration was executed last time, I have the table with migration info. It looks like this:

![migration item](migration-item.png)

All my migrations are just array of asynchronous functions which perform operations on tables items.

`gist:ba371a44a92c91f77159b20361d101bc`

In order to run these migrations, I take the index of the last executed migration and run all migrations, starting from this index. If there was no migration item in the management table it means that tables are empty and there is no need for migrations execution.

`gist:562d565dd5deab10b7441fadc73f5bb5`

Finally, you will have a script for database preparation. And you can run it automatically before deployment.

`gist:f7844131660c31029ee5594a1f6e0130`
