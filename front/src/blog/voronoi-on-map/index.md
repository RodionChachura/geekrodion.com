---
date: "2018-06-04"
title: "Voronoi Diagram of Google Map Places"
description: "Building a React app with Voronoi diagram of places in a city"
category: "programming"
keywords: [React, Voronoi Diagram, Data Visualization, Mapbox]
featuredImage: main.png
headline: "Voronoi Diagram of Google Map Places"
resources: [
  Demo https://rodionchachura.github.io/voronoi-on-map/,
  GitHub https://github.com/RodionChachura/voronoi-on-map
]
---

![](/main.png)

## Why Voronoi Diagram

А Voronoi diagram is an expressive tool to show how a plane can be optimally distributed between a set of points. It has applications in a large number of fields, such as natural sciences, health, engineering, geometry, civics, and informatics. Once I was wondering how a Voronoi diagram could be useful to service businesses. Is it possible to use the visualization to find a place for a service that won't be cluttered by competitors? In this post, we'll see how to make an application that makes the first step to solve this task by allowing us to have a Voronoi diagram for the specific type of place in the city.

## Application

User interactions in the application will consist of a few simple steps:

1. Select a city.
![select a city](/select-city.png)

2. Select the type of place.
![select a place](/select-place.png)

3. Waiting for the construction of the Voronoi diagram.
![construction](/construction.png)

4. Observe the Voronoi diagram
![observe](/observe.png)

As a starter for this, we will use a [modified version of create-react-app starter](https://github.com/RodionChachura/react-starter), as a components library — [material-ui](https://material-ui.com/).

## Select a Place

There is a lot of libraries that serve as a wrapper around google places API. I decided to use [react-places-autocomplete](https://github.com/hibiken/react-places-autocomplete). With the help of this library component to search city:

`gist:e898dbb15a883f084acafeed71302761`

Once a user selects a city, we execute a saga that will search for boundaries of the city. Since Google maps don’t have an API that will give you boundaries of the city, we will use open street maps service — [Nominatim](https://nominatim.org/). Response from this service is an array of places. If the city inside of it, we move to the next part.

`gist:c87a450846fc6c79e63da02aee0ec72a`

## Voronoi Algorithm

After the user has chosen the type of place he is interested in - our task is to get all locations of this type bounded by the bounding box of the city. And this is the trickiest part of the app since Google API won’t give us all the places of a particular type in the requested area. The API has a limit of giving 60 locations maximum in a response. We could use the magic number — 60000000 square meters(the maximum area to ask for).

The algorithm looks this way:
1. Split the bounding box of the city into rectangles with an area of less than the magic number.
2. Until there are no rectangles for investigation left, we keep making requests to the API. If you receive 60 places — high probability, there are more places of a specific type in the requested area. In such a case, you need to split the initial rectangle and put halves of it with other not investigated ones.

`gist:d0b2bc7661ba09972f77d60328e94725`

After we examined the rectangle it will appear on the map. When there are no rectangles for investigation left — it is time to merge results and build the Voronoi diagram for the entire bounding box. To render the diagram upon the map, we will use the SVG layer of [react-map-gl](https://github.com/visgl/react-map-gl) library.

`gist:4eefe32a4fa526b36ce41229c218d920`