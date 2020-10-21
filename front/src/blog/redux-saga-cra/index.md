---
date: "2018-04-27"
title: "Redux + Saga + Create-React-App"
description: "We will make a newly created react app suitable to work with redux and redux-saga."
category: "programming"
keywords: [Redux, Redux Saga, React, Create React App]
featuredImage: main.png
headline: "Redux + Saga + Create-React-App"
resources: [
  Udemy https://www.udemy.com/course/how-to-start-react-project-best-practices,
  GitHub https://github.com/RodionChachura/react-starter
]
---

![](/main.png)

## Create React App

We will use the most popular and well-maintained starter from Facebook - [create-react-app](https://github.com/facebook/create-react-app).

`gist:6c3fb6ff9127005977fccde259c8a045`

## Redux

To have a predictable state container in our app, we will use the most established library for state management - [Redux](https://github.com/reduxjs/redux). We could also include [redux-act](https://github.com/pauldijou/redux-act) to make actions and reducers more concise and readable.

`gist:0fd5fb59df83add83417da6352f61dd9`

With redux-act, we could leverage the functional nature of JavaScript to write actions and reducers this way:

`gist:aff9d511b2fcb7a40946923803001e14`

Also, we will most likely benefit from using two more libraries with redux. It is [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) and [redux-form](https://github.com/redux-form/redux-form). The first one allows us to see the state and its changes in the chrome extension. The second one simplifies work with forms — must-have if we have a lot of them.

`gist:b32317c1b63369f66ce28583d87f859d`

## Redux Saga

[Redux-saga](https://github.com/redux-saga/redux-saga) is a library that helps us to work with async code, such as requests and background app work. It is better to read some tutorials about redux-saga first if you don’t know what it is. In short terms, we subscribe generator function to action, and when this action occurs, it will trigger our saga. In this generator function, we can make all the work we don’t do in the reducer.

`gist:a1eca8114be6b5cd6a6a1378475fc697`

## All Together

We will keep all the reducers and actions in separate directories.

![src directory](/structure.png)

In the directory with reducers, we will create `index.js` file with references to all reducers.

`gist:e3cc20db3365411076595ea7bc8adaef`

After that, we will create a redux store for our app by combining all of our reducers and applying middleware.

`gist:0d5ceee03a87ad1c2ca65829e1c9e8b4`

Next, we will create `middleware.js` file for redux-saga.

`gist:e1bc923d67beba77737a5d53f581285a`

Once we have sagas and reducers in place, it is time to put everything together by wrapping our `App` component with `Provider`.

`gist:950c4534f2493b9e71816fa3273b2b0d`

## Saga and Actions

As we saw earlier, to run a saga, we need to subscribe to action first.

`gist:0d283d8fba914f37239a3d76912e2c79`

In the code snippet above, we can see that it is a little bit tedious to connect each action to an appropriate saga. To make it cleaner and easier to maintain, we will create the file in the sagas directory with the same name as the file with action declarations. Then in the newly created file, we will add a saga with the same name as the action name. By using this convention, we can go through each batch of actions and sagas pair and connect them in a loop.

`gist:9510d7155bc8554d48ddaa408ff5f240`

## State and Components

Also, we could utilize the function below with which we can connect the component to the store easier.

`gist:4ad1b22d2c61fcdd6b715e9073aec367`
