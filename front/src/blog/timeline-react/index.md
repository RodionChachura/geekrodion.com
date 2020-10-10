---
path: "/timeline-react"
date: "2018-12-06"
title: "Timeline with React"
description: "Making timeline component with React and publish it on NPM"
category: "programming"
keywords: [React, NPM, Tutorial, Front End Development, Increaser]
featuredImage: main.png
headline: "Timeline with React"
resources: [
  Demo https://rodionchachura.github.io/increaser-timeline/,
  GitHub https://github.com/RodionChachura/increaser-timeline
]
---

![Timeline by Increaser](/main.gif)

In this post, we are going to make a React component that will be available as an NPM module so that we could use it in different projects. You will find this post useful if you are planning to build a custom timer. Let’s dive in!

## create-react-library

[Create-react-app](https://github.com/facebook/create-react-app) is the best tool for bootstrapping the front-end project, and I always use it for new apps. However, since we want to make an NPM module, we need a different starter. After some research, I found a tool named [create-react-library](https://github.com/DimiMikadze/create-react-library) that using create-react-app to run demo and rollup to build the library.

To start a new project, we will type these commands:
```shell
$ npm install -g create-react-library
$ create-react-library increaser-Timer
$ cd increaser-Timer
```

After initializing the project, we will install the only extra library we will need.

```shell
$ npm install --save styled-components
```

And add additional fields in the `rollup.config.js` file.

```js
    ...
    external: ['styled-components'],
    globals: { 'styled-components': 'styled' }
}

```

First, we will run rollup to watch our `src` module and automatically recompile it into `dist` whenever we make changes.

```shell
$ npm start
```

The second part will be running the example create-react-app that’s linked to the local version of our module. In another tab:

```shell
$ cd example
$ npm start
```

## Timeline Component

Let’s start from the top of our components hierarchy. A lot of libraries requires width and height to specify size, but we will make it another way. We will require `Wrapper` component to be passed by props. And via refs, we will figure out the size of `Timeline`.  The second parameter is `sets` — an array of activities that have `start` and `end` in the form of the timestamp and `color`.

```js
{
    start: 1544027788352,
    end: 1544029330137,
    color: 'gold'
}
```

If you will track what you do during the day and give each activity a color, you will have an array of sets:)

![components directory](/structure.png)

## Timeline Container Component

The `Container` component is styled `div` tag. Here we can see how background color specified by accessing a theme. Inside of this component, we will have colored blocs that represent activities.

```js
import styled from 'styled-components'

export default styled.div`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  border-radius: 5px;
  margin: 0 10px;
  background-color: ${props => props.theme.backgroundColor};
  overflow: hidden;
`
```

## Timeline Period Component

The `Period` component represents set. Since we know when the first set started and the total time interval in seconds, we can show activity on the timeline by using margin and width.

```js
import React from 'react'
import styled from 'styled-components'

const Period = styled.div`
  position: absolute;
  height: 100%;
  bottom: 0;
`

export default ({ beginning, secondsInInterval, start, end, color }) => {
  const diff = (one, other) => `${one.diff(other).as('seconds') * 100 / secondsInInterval}%`
  const style = {
    marginLeft: diff(start, beginning),
    width: diff(end, start),
    backgroundColor: color
  }
  return (
    <Period style={style} />
  )
}
```

## Timeline Start and End

The `Time` component shows the start and the end of the timeline. The beginning is always the start of the first set, and the ending is our last calculated hour.

```js
import React from 'react'
import styled from 'styled-components'

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  color: ${props => props.theme.textColor};
`
const format = (hour, minute) =>
  `${hour < 12 ? hour : hour - 12}${minute !== undefined ? `:${minute}` : ''} ${hour < 12 ? 'AM' : 'PM'}`

export default ({ start, endHour }) => {
  return (
    <Line>
      <p>{format(start.hour, start.minute)}</p>
      <p>{format(endHour)}</p>
    </Line>
  )
}
```

## Update Demo Project

Don’t forget we also have an example project where we will import the `Timer` component. An interesting part in the demo is that we generate random sets and repeat it over and over.

```js
import React from 'react'
import styled from 'styled-components'

import Timer from 'increaser-timer'

const TestingPage = styled.div`
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  position: relative;
  height: 60%;
  width: 80%;
  padding: 20px;
  background-color: #7FDBFF;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  transition: background-color 800ms linear;
`

const Increaser = styled.a`
  top: 20px;
  left: 20px;
  position: absolute;
  font-family: 'Dancing Script', cursive;
  color: white;
  font-size: 34px;
  cursor: pointer;
  text-decoration: none;
`

const TimeWaitsForNoOne = styled.a`
  margin: 40px;
  color: black;
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  cursor: pointer;
  text-decoration: none;
`

const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const startTime = Date.now()
    this.state = {
      startTime,
      duration: 1,
      timeNow: startTime
    }
    setInterval(() => {
      const timeNow = Date.now()
      const { startTime, duration } = this.state
      this.setState({ timeNow })
      if (timeNow - startTime > duration * 60 * 1000) {
        this.setState({ startTime: timeNow })
      }
    }, 500)
  }

  render() {
    const { startTime, duration, timeNow } = this.state
    return (
      <TestingPage>
        <Container>
          <Timer
            wrapper={ContainerWrapper}
            startTime={startTime}
            duration={duration}
            timeNow={timeNow}
            showTimeInTitle={true}
            handleBeforeUnload={true}
          />
          <Increaser target="_blank" href="https://increaser.org">
            Increaser
          </Increaser>
        </Container>
        <TimeWaitsForNoOne
          target="_blank"
          href="https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d"
        >
          {"Time Waits For No One, and It Won't Wait For Me"}
        </TimeWaitsForNoOne>
      </TestingPage>
    )
  }
}
```