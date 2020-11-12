---
date: "2020-11-12"
title: "Connect With Customers From Email List on LinkedIn With Automation"
description: "Using Puppeteer and NodeJS to automatically connect and message on LinkedIn"
category: "programming"
keywords: [Automation, Puppeteer, JavaScript]
featuredImage: main.png
resources: [
  GitHub https://github.com/RodionChachura/linkedin-connector,
  YouTube https://youtu.be/8PcqBphVpWA
]
---

![](/main.png)

## The Problem of Talking With Customers

When you are building a product, it is crucial to talk to customers - to understand their problems, what did they use before finding your app, and how does it help them. To ask these questions, I have a service that sends an email to a person a few days after sign up. It asks a personalized question based on how active he was using the app. The problem is that people very rarely respond to these kinds of emails. A few months ago, I started thinking - what could I do to get more conversations with people that tried [Increaser](https://increaser.org/). I don't ask a signed up person for any information, so I left off only with their name, country, and email. Is there is a way to connect with them on a platform where there is a higher probability of getting a response?

## Email -> Outlook -> LinkedIn

It is not that trivial to find the social media profile of a person even when you know his name, email, and country. Also, the chance of connecting to the wrong person with the same name is pretty high.

After doing a little bit of research, I found that when you add a contact in Outlook, it shows you a LinkedIn profile connected to a given email, if there is one.

![Outlook -> LinkedIn](/outlook.png)

## The Initial Manual Process

To know when a new person signed up in the app, I added a small function on the back-end that sends a Telegram message with basic info and options for a LinkedIn note.

![Telegram messages](/telegram.png)

I would check the channel every other day and repeat these steps for every message.
1. Grab email and create a contact in Outlook.
2. Go to the LinkedIn profile if it exists.
3. Go to the database, to check if a person did any work with [Increaser](https://increaser.org/).
4. Copy the appropriate text for the note.
5. Connect and add the note.
6. Save LinkedIn handle to the database.

It is possible to automate the whole process, but I wasn't sure if it worth it. After two months, I got pretty bored of doing the same thing every other day and decided to write a program.

## Automation With NodeJS and Puppeteer

Let's take a look at a small program that does everything for us.

![Code structure](/structure.png)

We could run Headless Chromium that goes together with Puppeteer when you are installing the library. In such a case, we will need to sign in to Outlook and LinkedIn every time we need to run the program, and that's too much work. Instead, we could launch a regular Chrome browser, where we already signed in to both websites. To do this, we need to close the existing Chrome application and lunch the browser with an open debugging port.

```shell:title=run_chrome.sh
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

This command will output browser web socket endpoint.

![Launch Chrome](/run_chrome.png)

Let's copy the endpoint, open a new terminal, and pass the parameter to the NodeJS program.

```shell{promptUser: geekrodion}
npm start ws://127.0.0.1:9222/devtools/browser/3ab28dde-bf55-4add-94a6-f96f254a7f6c
```
We won't go into much detail on implementation because everything is pretty straightforward.

```js:title=index.js
const Browser = require('./browser')
const { getNote, getOrderedUsers } = require('./business')
const database = require('./database')
const storage = require('./storage')

const browserWSEndpoint = process.argv[2]
const browser = new Browser(browserWSEndpoint)

const run = async () => {
  const users = await database.getNewUsers(storage.getLastDate())
  if (!users.length) {
    console.log('No new users')
    return
  }
  
  console.log(`New users count: ${users.length}`)
  const orderedUsers = getOrderedUsers(users)

  await browser.openOutlook()

  for await (const user of orderedUsers) {
    await browser.createContact(user.email)
    await browser.openLinkedInSection()
    const linkedInButton = await browser.getLinkedInButton()
    if (linkedInButton) {
      const note = getNote(user)
      const linkedInProfile = await browser.connectOnLinkedIn(
        linkedInButton,
        note
      )
      await database.setUserLinkedInProfile(user.id, linkedInProfile)
    }
    storage.setLastDate(user.registrationDate)
  }
}

run()
```

First, we create an instance of browser class that has methods for everything we need. The constructor receives the browser WebSocket endpoint that we passed as a parameter to the program. You could check the implementation of the class in the repository [here](https://github.com/RodionChachura/linkedin-connector/blob/master/src/browser.js). 

[The database module](https://github.com/RodionChachura/linkedin-connector/blob/master/src/database.js) exports two methods: one to get all new users, and another one to save a user's LinkedIn profile. You will need to rewrite this module for your use case. To know which users are new, we are locally saving the registration date of the last processed user.

Another module that requires custom implementation is [business](https://github.com/RodionChachura/linkedin-connector/blob/master/src/business.js). It exports a function that sorts the users based on the registration date and another one that produces a personalized note.

That's all. Try this program, and let me know if it helped you!