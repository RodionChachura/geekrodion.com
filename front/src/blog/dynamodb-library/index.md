---
date: "2019-09-06"
title: "DynamoDB Library with NodeJS"
description: "The goal of this story is to show useful functions that can help you to solve common problems arising when dealing with DynamoDB"
category: "programming"
keywords: [DynamoDB, NodeJS, Tutorial]
featuredImage: main.png
headline: "DynamoDB Library with NodeJS"
resources: [
  GitHub https://github.com/RodionChachura/awsdynamoutils
]
---

![](/main.png)

## DynamoDB Library

The goal of this story is to show useful functions that can help you to solve common problems arising when dealing with DynamoDB by explaining the library that helped me in different projects and which is actively used in [Increaser](https://increaser.org).

I decided to use DynamoDB at my first job because it was pretty easy to get started with, and no extra hustle needed to connect to it from the deployed service. Because other microservices at that job also used DynamoDB and at the same time I was working on a side project that used the same database I created a small [NPM module](https://www.npmjs.com/package/awsdynamoutils) with reusable functions to escape from copy-pasting.

After using the library for more than a year, I decided to write about it because it helped me a lot. The library consists of one file, and we will go with a bottom-up approach to better understand what’s happening inside it better.

## Starting

You can follow up by cloning the [repository](https://github.com/RodionChachura/awsdynamoutils) and going along the story or by creating a file and installing the only two libraries that we will need.

```shell{promptUser: geekrodion}
npm install aws-sdk uuid
```

First, we will import all the libraries we need and create a function that returns an object containing utils. The module will export this function and result of this function invocation.

```js:title=utils.js
const uuid = require('uuid/v4')
const AWS = require('aws-sdk')

const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    documentClient
  })
}

module.exports = {
  ...getModule({}),
  getModule,
}
```

When we are developing a service locally, we usually start DynamoDB in docker. To make `DocumentClient` understand which database it should connect to, we pass a configuration object to it. When the app is running on AWS, we don’t need to specify anything since it can take configuration from environment variables.

In [Increaser](https://increaser.org), I import the library only once, pass a config to it, and export the module like this:

```js:title=utils/db.js
const { getModule } = require('awsdynamoutils')

const config =
  process.env.NODE_ENV !== 'test'
    ? {}
    : {
        endpoint: process.env.DYNAMO_ENPOINT,
        region: 'mock',
        credentials: {
          accessKeyId: 'accessKeyId',
          secretAccessKey: 'secretAccessKey'
        }
      }

module.exports = getModule(config)
```

## Creating Tables

Usually we create DynamoDB tables for production via Terraform, CloudFormation, or manually in AWS, but, when we want to test the app locally, it easier to create tables programmatically, before running tests.

To create a table, we need to have quite a big object that describes a table. To make the process of table creation easier, we will write one function that constructs the object for a table with a single key, and another — with a composite key.

```js:title=utils.js
// ...
const ProvisionedThroughput = {
  ReadCapacityUnits: 10,
  WriteCapacityUnits: 10
}

const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    tableParams: (
      tableName,
      keyName,
      keyType = 'S',
      provisionedThroughput = ProvisionedThroughput
    ) => ({
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: keyName,
          KeyType: 'HASH'
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: keyName,
          AttributeType: keyType
        }
      ],
      ProvisionedThroughput: provisionedThroughput
    }),
    tableParamsWithCompositeKey: (
      tableName,
      hashName,
      rangeName,
      hashType = 'S',
      rangeType = 'S',
      provisionedThroughput = ProvisionedThroughput
    ) => ({
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: hashName,
          KeyType: 'HASH'
        },
        {
          AttributeName: rangeName,
          KeyType: 'RANGE'
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: hashName,
          AttributeType: hashType
        },
        {
          AttributeName: rangeName,
          AttributeType: rangeType
        }
      ],
      ProvisionedThroughput: provisionedThroughput
    })
  })
}
// ...
```

In [Increaser](https://increaser.org), to have tables for tests, I construct parameters and then iterate over them to create tables.

```js:title=global-setup.js
/* eslint-disable no-console */
require('dotenv').config()
const AWS = require('aws-sdk')

const { TABLE_NAME } = require('../src/constants/db')
const { tableParams } = require('../src/utils/db')

const TABLES_PARAMS = [
  tableParams(TABLE_NAME.USERS, 'id'),
  tableParams(TABLE_NAME.FEATURES, 'id')
]

module.exports = async () => {
  AWS.config.update({
    endpoint: process.env.DYNAMO_ENPOINT,
    region: 'mock',
    credentials: {
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey'
    }
  })
  const database = new AWS.DynamoDB()
  await Promise.all(
    TABLES_PARAMS.map(params =>
      database
        .createTable(params)
        .promise()
        .catch(err =>
          console.error(
            'Unable to create table: ',
            JSON.stringify(err, null, 2)
          )
        )
        .then(
          data =>
            data &&
            console.info('Database created: ', JSON.stringify(data, null, 2))
        )
    )
  )
  const createdWaiter = new AWS.ResourceWaiter(database, 'tableExists')
  await Promise.all(
    TABLES_PARAMS.map(({ TableName }) =>
      createdWaiter.wait({ TableName, $waiter: { delay: 1 } }).promise()
    )
  )
}
```

## Taking Only What We Need

More often than not, we want to take only specific fields of the item, and DynamoDB allows us to do this by specifying `ProjectionExpression` in parameters.

Usually, we also need to put `ExpressionAttributesNames` in parameters object, because field we want to project can have the same name as a reserved keyword. For example, if we want to take user projects, we don’t need `ExpressionAttributeNames`.

```js
{
  ProjectionExpression: "projects"
}
```

If we also want to get the user name, we should add `ExpressionAttributeNames` to parameters, since the name is reserved DynamoDB keyword.

```js
{
  ProjectionExpression: "projects, #name",
  ExpressionAttributeNames: {
    "#name": "name"
  }
}
```

We can see that this can be quite cumbersome. Would be nice to have a function to which we can pass an array of needed fields to receive an object with `ProjectionExpression` and `ExpressionAttributeNames` in it.

```js:title=utils.js
// ...
const projectionExpression = attributes => {
  if (attributes === undefined) return {}
  const ProjectionExpression = attributes
    .map(attr => `${attr.includes('.') ? '' : '#'}${attr}, `)
    .reduce((acc, str) => acc + str)
    .slice(0, -2)

  const attributesToExpression = attributes.filter(attr => !attr.includes('.'))
  const ExpressionAttributeNames = attributesToExpression.reduce(
    (acc, attr) => {
      acc['#' + attr] = attr
      return acc
    },
    {}
  )

  return attributesToExpression.length
    ? { ProjectionExpression, ExpressionAttributeNames }
    : { ProjectionExpression }
}

const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    projectionExpression
  })
}
// ...
```

Let’s test this function and see what we will get.

```js:title=example.js
const { name, email } = projectionExpression(['name', 'email'])
// {
//   ProjectionExpression: "#name, #email",
//   ExpressionAttributeNames: {
//     "#name": "name",
//     "#email": "email"
//   }
// }
const { country, project } = projectionExpression(['country', 'project.someName'])
// {
//   ProjectionExpression: "#country, project.someName",
//   ExpressionAttributeNames: {
//     "#country": "country"
//   }
// }
```

## Getting All Items

When we are scanning or querying a table that has a lot of items, we will receive data by parts because of pagination. But we can write a function to get all at once.

The function receives a method we want to execute(scan or equery) and returns a function that returns the result of the method call with awareness to pagination.

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  const paginationAware = method => async params => {
    const getItems = async (items, lastEvaluatedKey, firstTime = false) => {
      if (!lastEvaluatedKey) return items

      const { Items, LastEvaluatedKey } = await documentClient[method](
        firstTime ? params : { ...params, ExclusiveStartKey: lastEvaluatedKey }
      ).promise()
      return await getItems([...items, ...Items], LastEvaluatedKey)
    }
    return getItems([], true, true)
  }
  return ({
    // ...
    paginationAware
  })
}
// ...
```

We can use this function to get all the items in the table by scanning without condition.

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)
  // ...
  const scan = paginationAware('scan')
  return ({
    // ...
    getAll: (TableName, params) =>
      scan({ TableName, ...projectionExpression(params) })
        .promise()
        .then(({ Items }) => Items),
  })
}
// ...
```

For example, in [Increaser](https://increaser.org), I use this function to get all the features proposed by users.

```js
const features = await getAll(TABLE_NAME.FEATURES)
```

## Searching Items

When we have a table with a composite key, we may want to find items that have the same part of the key.

```js:title=utils.js
// ...

const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    searchByPKParams: (key, value) => ({
      KeyConditionExpression: '#a = :aa',
      ExpressionAttributeNames: {
        '#a': key
      },
      ExpressionAttributeValues: {
        ':aa': value
      }
    })
  })
}
// ...
```

Example of a table with a composite key is a table with shared projects. Where the hash key is the id of a project and range key is the id of a user. If we want to find ids of users to whom shared a project, we will write a function like shown below.

Sometimes we want to find all items that share the same key, for example — find all users that are in the same country. The only change — we replace `KeyConditionExpression` with `FilterExpression`.

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    searchByKeyParams: (key, value) => ({
      FilterExpression: '#a = :aa',
      ExpressionAttributeNames: {
        '#a': key
      },
      ExpressionAttributeValues: {
        ':aa': value
      }
    })
  })
}
// ...
```

Common use-case may-be a check if a user with a given email already exists.

```js
const userWithEmailExists = email =>
  scan({
    TableName: TABLE_NAME.USERS,
    ...mergedParams(
      searchByKeyParams('email', email),
      projectionExpression(['email'])
    )
  })
  .promise()
  .then(data => data.Items.length > 0)
```

## Mergin Parameters

In previous examples, we merged two objects for parameters by using the function listed below.

```js:title=utils.js
// ...
const mergedParams = (...params) =>
  params.reduce(
    (acc, param) =>
      Object.entries(param).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value)
          ? [...acc[key], ...value]
          : typeof value === 'object' ? { ...acc[key], ...value } : value
        return acc
      }, acc),
    {}
  )
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    mergedParams
  })
}
// ...
```

This function checks if the field is array or object and act accordingly, so after a merge, we won’t lose an important parameter. In the example below, we can see how the function resolves a situation when both objects share the same property.

```js
const searchParams = {
  FilterExpression: "#a = :aa",
  ExpressionAttributeNames: {
    "#a": "email"
  },
  ExpressionAttributeValues: {
    ":aa": "mock@mail.com"
  }
}
const projectionParams = {
  ProjectionExpression: "#name, #projects",
  ExpressionAttributeNames: {
    "#name": "name",
    "#projects": "projects"
  }
}

console.log(mergedParams(searchParams, projectionParams))
// {
//   "FilterExpression": "#a = :aa",
//   "ExpressionAttributeNames": {
//     "#a": "email",
//     "#name": "name",
//     "#projects": "projects"
//   },
//   "ExpressionAttributeValues": {
//     ":aa": "mock@mail.com"
//   },
//   "ProjectionExpression": "#name, #projects"
// }
```

## Generating ID

Pretty often, the primary key in our tables is a random string. It would be useful to have a function creates an id, and also a function that receives an object and returns an object with id.

```js:title=utils.js

// ...
const getId = () =>
  'a' +
  uuid()
    .split('-')
    .join('')

const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    getId,
    withId: item => item.id ? item : { ...item, id: getId() }
  })
}
// ...
```

We are using the library to generate id and remove symbols that are not allowed by DynamoDB.

```js:title=utils.js
const id = getId()
// af96fb0da46814f4da8b5a5b36739ad34

const userWithId = withId({ name: 'Geek Rodion', email: 'geekrodion.com' })
// { 
//   name: 'Geek Rodion',
//   email: 'geekrodion.com',
//   id: 'a02202e8839e44d01b3b22f85013959e1'
// }
```

## Updating Item

Pretty often, we may need to update the value of item property.

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    setNewValue: (params, propName, value) =>
      documentClient
        .update({
          ...params,
          UpdateExpression: `set #value = :newValue`,
          ExpressionAttributeValues: {
            ':newValue': value
          },
          ExpressionAttributeNames: {
            '#value': propName
          }
        })
        .promise()
  })
}
// ...
```

For example, I use this function in [Increaser](https://increaser.org) to update user projects.

```js
const defaultParams = id => ({
  TableName: TABLE_NAME.USERS,
  Key: { id }
})

const updateProjects = (userId, projects) =>
  setNewValue(defaultParams(userId), 'projects', projects)
```

What if we want to update a few parameters at once?

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    flatUpdateParams: params => ({
      UpdateExpression: `set ${Object.entries(params)
        .map(([key]) => `#${key} = :${key}, `)
        .reduce((acc, str) => acc + str)
        .slice(0, -2)}`,
      ExpressionAttributeNames: Object.keys(params).reduce(
        (acc, key) => ({
          ...acc,
          [`#${key}`]: key
        }),
        {}
      ),
      ExpressionAttributeValues: Object.entries(params).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`:${key}`]: value
        }),
        {}
      )
    })
  })
}
// ...
```

For example, we can use this function to update the user address.

```js:title=example.js
const flatParams = flatUpdateParams({ country: "Belarus", city: "Minsk" })
// { 
//   UpdateExpression: 'set #country = :country, #city = :city',
//   ExpressionAttributeNames: { '#country': 'country', '#city': 'city' },
//   ExpressionAttributeValues: { ':country': 'Belarus', ':city': 'Minsk' }
// }
await documentClient
  .update({
    ...defaultParams(userId),
    ...flatParams
  })
  .promise()
```

## Get Specific Item

We have a primary key, and we want to get the corresponding item.

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    getByPK: (params, attributes = undefined) =>
      documentClient
        .get(
          mergedParams(params, attributes ? projectionExpression(attributes) : {})
        )
        .promise()
        .then(data => (Object.keys(data).length ? data.Item : undefined))
  })
}
// ...
```

In [Increaser](https://increaser.org), I have a dedicated file for each table. From `db/users.js` I export function to get the user by its id.

```js
const get = (id, attributes = undefined) =>
  getByPK(defaultParams(id), attributes)
```

## List Operators

In JS we can easily merge one array into another like this:

```js
const newArray = [...another, ...one]
```

It would be nice to have a similar function in our library.

```js:title=utils.js
// ...
const mergeInList = (params, listName, list) =>
  documentClient
    .update({
      ...params,
      UpdateExpression: `set #listName = list_append(#listName, :mergeList)`,
      ExpressionAttributeValues: {
        ':mergeList': list
      },
      ExpressionAttributeNames: {
        '#listName': listName
      }
    })
    .promise()

const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    mergeInList
  })
}
// ...
```

What if we want to do something like this?

```js
array.push(element)
```

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    putToList: (params, listName, object) => mergeInList(params, listName, [object])
  })
}
// ...
```

In [Increaser](https://increaser.org) user can have projects, and when he creates one, the function shown below called.

```js
const addProject = (userId, project) =>
  putToList(defaultParams(userId), 'projects', project)
```

The final function in our library will help us to remove the array element by its index.

```js:title=utils.js
// ...
const getModule = (config) => {
  const documentClient = new AWS.DynamoDB.DocumentClient(config)

  return ({
    // ...
    removeFromListByIndex: (params, listName, index) =>
      documentClient
        .update({
          ...params,
          UpdateExpression: `remove #listName[${index}]`,
          ExpressionAttributeNames: {
            '#listName': listName
          }
        })
        .promise()
  })
}
// ...
```

We can think of an example, where we have to remove the project with a given index.

```js
const getRemoveFromListByIndex = listName => (userId, index) =>
  removeFromListByIndex(defaultParams(userId), listName, index)
  
const removeTaskByIndex = getRemoveFromListByIndex('tasks')
const removeProjectByIndex = getRemoveFromListByIndex('projects')
```

We completed a small DynamoDB library that covers most operations. If you have any questions — leave a comment. If you want to make some improvements or add functionality — please make a pull request to the [repository](https://github.com/RodionChachura/awsdynamoutils).