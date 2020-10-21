---
date: "2019-03-02"
title: "Google+Facebook Authorization in React+Redux+NodeJS App"
description: "Add social authorization to your React app with NodeJS backend in a few minutes"
category: "programming"
keywords: [JavaScript, React, Redux, NodeJS, Tutorial]
featuredImage: main.png
headline: "Google+Facebook Authorization in React+Redux+NodeJS App"
resources: [
  Demo https://increaser.org
]
---

![](/main.png)

Recently I faced the reality of the fact that it is the time to introduce authorization to my productivity app - [Increaser](https://increaser.org). By the current moment, I implemented authorization logic at least six times, and I am not excited about doing this routine task, and I think you too. So let’s make it as fast and easy as possible.

## Full-stack Plan

We will cover both the front-end and back-end parts. To bootstrap the app, I used [create-react-app](https://github.com/facebook/create-react-app). If you are curious about what steps to make in the new React app to add redux and redux-saga, you can check [this post](https://geekrodion.com/blog/redux-saga-cra). I have the back-end on NodeJS and using [Apollo Server](https://www.apollographql.com/docs/apollo-server/), but we will look at parts that we could use regardless of the technology.

Authentication flow will look this way:
1. Receive a token from Google/Facebook.
2. Make a request to the back-end to receive JWT token.
3. Save token to local storage and use it in requests to back-end until it expires.

![example](/example.gif)

## Front-end Side

For authentication, we will create a simple component with two buttons.

```js
const Auth = ({ authorizeWithGoogle, authorizeWithFacebook }) => {
  return (
    <>
      <Button onClick={authorizeWithGoogle} icon={faGoogle} text='Sign In with Google'/>
      <Button onClick={authorizeWithFacebook} icon={faFacebookF} text='Sign In with Facebook'/>
    </>
  )
}
```

When a user clicks on one of the buttons, the appropriate saga will be triggered. Both of them are very similar and have the same steps.

```js
export function* authorizeWithGoogle() {
  const provider = PROVIDER.GOOGLE
  try {
    if (!googleAuthAvailable()) {
      yield call(() => new Promise(resolve => loadScript(
        GOOGLE_SCRIPT,
        () => {
          const g = window.gapi
          g.load('auth2', () => {
            g.auth2.init({
              client_id: GOOGLE_CLIENT_ID,
              scope: GOOGLE_SCOPE
            })
            resolve()
          })
        }
      )))
    }
    const ga = window.gapi.auth2.getAuthInstance()
    const googleUser = yield call(() => new Promise((resolve, reject) => ga.signIn().then(resolve, reject)))
    const { id_token } = googleUser.getAuthResponse()

    yield * authorize(provider, id_token)
  } catch(err) {
    reportError(provider, err)
  }
}

export function* authorizeWithFacebook() {
  const provider = PROVIDER.FACEBOOK
  try {
    if (!window.FB) {
      yield call(() => new Promise(resolve => loadScript(FACEBOOK_SCRIPT, resolve)))
      yield call(() => new Promise(resolve => {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            version : FACEBOOK_VERSION
          })
          resolve()
        }
      }))
    }

    const fb = window.FB
    const response = yield call(() => new Promise(resolve => fb.login(resolve, { scope: FACEBOOK_SCOPE })))
    if (response && response.authResponse) {
      const { accessToken } = response.authResponse
      if (!accessToken) return
  
      yield * authorize(provider, accessToken)
    }
  } catch(err) {
    reportError(provider, err)
  }
}
```

First, we need to load the script if not loaded. We will write the function to do this.

```js
export const loadScript = (src, onLoad) => {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.body.appendChild(script)
  script.onload = onLoad
}
```

When a provider’s code in place we are calling one of its methods for authorization and pass scope that specifies what user’s data we want, in our case it is email and basic user info.

And of course, we need to get keys to make requests to Google and Facebook and specify them in constants.

```js
export const GOOGLE_SCRIPT = 'https://apis.google.com/js/platform.js'
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
export const GOOGLE_SCOPE = 'profile email'

export const FACEBOOK_SCRIPT = 'https://connect.facebook.net/en_US/sdk.js'
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID
export const FACEBOOK_VERSION = 'v2.11'
export const FACEBOOK_SCOPE = 'public_profile,email'

export const PROVIDER = {
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK'
}
```

With a token from the provider, we are ready to make the request to our app and authorize a user.

```js
export function* authorize(provider, token) {
  const query = `
    query {
      identify(provider: ${provider}, token: "${token}") {
        token,
        tokenExpirationTime,
        id
      }
    }
  `
  const { data: { identify } } = yield call(post, API, { query })
  yield put(receiveAuthData(identify))
}
```

In this function, we build a query for GraphQL backend where we specify the name of provider and token. Then we trigger action to save response in the state.

We can save token to local storage in redux middleware like this.

```js
if (prevState.auth.token !== nextState.auth.token) {
  if (!nextState.auth.token) {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpirationTime')
    localStorage.removeItem('id')
  } else {
    localStorage.setItem('token', nextState.auth.token)
    localStorage.setItem('tokenExpirationTime', nextState.auth.tokenExpirationTime)
    localStorage.setItem('id', nextState.auth.id)
  }
  setUserForReporting(nextState.auth.id)
}
```

By taking a token from local storage, we can make a request to the API.

```js
class RequestError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
}

export const headers = () => {
  const token = localStorage.getItem('token')
  const basic = {
    'Content-Type': 'application/json'
  }
  return token ? { ...basic, Authorization: token } : basic
}

export const makePostOptions = data => ({
  method: 'POST',
  headers: headers(),
  body: JSON.stringify(data)
})

const request = (url, options) =>
  fetch(url, options).then(response => {
    const { status } = response

    if (status === 204) return {}
    const json = response.json()
    if (status >= 200 && status < 300) return json
    return json.then(message => {
      throw new RequestError(status, message)
    })
  })

export const post = (url, data) => request(url, makePostOptions(data))

export function* synchronize() {
    ...
    const payload = { ... }
    const { data: { synchronize }, errors } = yield call(post, API, payload)
    if (errors) {
      if (errors.find(e => e.message === 'Invalid Token')) {
        yield put(unauthorizeUser())
      } else {
        reportError('fail to synchronize', { errors })
      }
    } else {
      yield put(receiveSets(synchronize))
    }
  }
}
```

I think we covered the main parts of the authorization process on front-end. Now let’s look at what is going on on the back-end.

## Back-end Side

We will not go into specifics here but rather will look at parts that can be reused regardless of the technology you use.

First, let’s write a function that will receive the name of the provider and token and return user and auth data. Also, this function will save user to the database if no such user exists.

```js
const identify = async ({ provider, token }) => {
  const getUserData = () => {
    if (provider === 'GOOGLE') {
      return getValidatedWithGoogleUser(token)
    } else if (provider === 'FACEBOOK') {
      return getValidatedWithFacebookUser(token)
    }
    throw new Error(`provider: ${provider} is not supported`)
  }
  const userData = await getUserData()
  if (!userData.email) {
    throw new Error(`fail to authroize with given provider: ${provider}. Response: ${JSON.stringify(userData)}`)
  }
  const { email, name } = userData
  const getCompleteUser = async () => {
    const userWithEmailExists = await usersTable.userWithEmailExists(email)
    if (userWithEmailExists) {
      return usersTable.getByEmail(email, ['id', 'name', 'email'])
    }
    const user = {
      id: getId(),
      name,
      email
    }
    await usersTable.put(user)
    return user
  }

  const user = await getCompleteUser()
  const authData = generateAuthData(user.id)

  return {
    ...user,
    ...authData
  }
}
```

Here we are using quite a few utility functions for authorization. Let’s list them here.

```js
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const {
  VALIDATE_GOOGLE_TOKEN_URL,
  VALIDATE_FACEBOOK_TOKEN_URL,
  JWT_LIFESPAN_IN_SECONDS
} = require('../constants/auth')

module.exports = {
  generateAuthData: id => {
    const tokenExpirationTime = Math.floor(Date.now() / 1000) + JWT_LIFESPAN_IN_SECONDS
    return {
      token: jwt.sign({ id, exp: tokenExpirationTime }, process.env.SECRET),
      tokenExpirationTime
    }
  },
  getValidatedWithGoogleUser: async tokenId => {
    const response = await fetch(VALIDATE_GOOGLE_TOKEN_URL + tokenId)
    return response.json()
  },
  getValidatedWithFacebookUser: async tokenId => {
    const response = await fetch(VALIDATE_FACEBOOK_TOKEN_URL + tokenId)
    return response.json()
  },
  userIdFromToken: async token => {
    const decoded = jwt.verify(token, process.env.SECRET)
    return decoded ? decoded.id : undefined
  }
}
```

To provide userId to the context of a request, we will take a token from headers, validate it and take `userId` from it.

```js
const getContext = async ({ event }) => {
  const authHeader = event.headers['Authorization']
  const getUserId = async () => {
    if (!authHeader) return undefined
    try {
      const userId = await userIdFromToken(authHeader.replace('Bearer ', ''))
      return userId
    } catch(err) {
      return undefined
    }
  }
  const userId = await getUserId()
  return { userId }
}
```