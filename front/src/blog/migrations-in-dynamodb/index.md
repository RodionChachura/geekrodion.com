---
path: "/migrations-in-dynamodb"
date: "2018-02-26"
title: "Migrations in DynamoDB"
description: "Migrate DynamoDB items to a new format with async functions."
category: "programming"
keywords: [DynamoDB,Database,NodeJS,DevOps,AWS]
---
When you work with frameworks such as ASP.NET or Django, ORM (Entity Framework, Django ORM) magically creates migration, and with DynamoDB, it may seem strange that you need to write migrations by yourself. But it is the price of using NoSQL and rejecting ORMs, but don't worry, managing migrations by yourself isn't that scary.

## Create and Delete Tables
The first step is to take care of the creation of new tables and deletion of those we don't need anymore. To do this, we compare DynamoDB tables' names with the list of tables parameters. After that, we execute operations that will delete and create tables if needed.