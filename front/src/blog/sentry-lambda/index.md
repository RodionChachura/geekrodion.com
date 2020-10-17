---
path: "/test-dynamodb-nodejs"
date: "2019-09-19"
title: "Sentry with AWS Lambda running Apollo Server"
description: "Do you have AWS Lambda running GraphQL Apollo Server and want to add Sentry for errors reporting?"
category: "programming"
keywords: [Sentry, Error Handling, AWS Lambda, Apollo, GraphQL]
featuredImage: main.png
headline: "Sentry with AWS Lambda running Apollo Server"
---

![](/main.png)

Do you have AWS Lambda running GraphQL Apollo Server and want to add Sentry for errors reporting? Let me show you pretty quick how I did it in [Increaser](https://increaser.org/).

## Apollo Server Entry Point

Let’s start with an opening file exporting Apollo Server handler and add Sentry initialization to it.

```js:title=lambda.js
const Sentry = require('@sentry/node')
const { ApolloServer } = require('apollo-server-lambda')

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event: { headers } }) => {
    // ...
  }
})

Sentry.init({ dsn: process.env.SENTRY_KEY })

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
```

## Resolvers

In the file exporting resolvers, we are going to wrap every resolver with the function that will report errors to Sentry.

```js:title=resolvers.js
const Mutation = require('./mutation')
const Query = require('./query')
const { resolversWrapper } = require('../utils/graphql')
const { objectMap } = require('../utils/generic')

module.exports = objectMap({ Query, Mutation }, resolversWrapper)
```

## Map Over Object

To map over the object, we will write the function that receives an object and mapper function. The mapper will receive object property value as a first parameter and key as a second.

```js:title=generic.js

const objectMap = (object, mapper) =>
  Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: mapper(value, key)
    }),
    {}
  )

module.exports = {
  objectMap
}
```

## Wrapping Resolvers

Finally, we are ready to write the function that receives an object with resolvers and returns an object with wrapped resolvers.

```js:title=graphql.js
const { AuthenticationError } = require('apollo-server')
const Sentry = require('@sentry/node')

const { AuthorizationError } = require('../errors')
const { objectMap } = require('./generic')

const resolversWrapper = resolvers =>
  objectMap(resolvers, (resolver, name) => async (...args) => {
    try {
      const result = await resolver(...args)
      return result
    } catch (err) {
      if (
        err instanceof AuthenticationError ||
        err instanceof AuthorizationError
      ) {
        throw err
      }
      // eslint-disable-next-line no-console
      console.error('ERROR: ', err, args)
      const [variables, context] = args.slice(1)
      Sentry.withScope(scope => {
        scope.setExtra('resolver', name)
        scope.setExtra('variables', variables)
        scope.setExtra('context', context)
        Sentry.captureException(err)
      })
      await Sentry.flush(2000)

      throw new Error('INTERNAL_SERVER_ERROR')
    }
  })

module.exports = {
  resolversWrapper
}
```

If we catch the error while calling initial resolver, we want to check if an error was thrown intentionally by looking if it is an instance of one of the errors we used in resolvers. If this is the case, we don’t need to report to Sentry.

If resolver failed for unclear reasons, we console log it, just in case. Then we take variables and context(second and third arguments) and send error with all information to Sentry.

We want to wait until Sentry sends the error to see it on the dashboard. We explicitly wait because Lambda can stop after the request is finished and we won’t know that something had happened. In the end, we return internal server error because the client doesn’t care if there some strange error happened in the service or somewhere else.