---
date: "2018-10-28"
title: "Adding Likes to ASP.NET Core + React/Redux Blog"
description: "See recent posts and like them"
category: "programming"
keywords: [ASP.NET Core, React, Redux, Tutorial, Blog]
featuredImage: main.png
partNumber: 4
resources: [
  GitHub https://github.com/RodionChachura/simple-blog-back/tree/part-4 Back-end Code,
  GitHub https://github.com/RodionChachura/simple-blog-front/tree/part-4 Front-end Code
]
---

![](/main.png)

### Goal for this part

Let’s start this part of this series by listing features we going to make as user stories.

1. As a user, I want to be able to see recent stories, so that I can find something to read.

1. As a user, I want to like stories, so I can show the author that content was useful for me.

![demo](/demo.gif)

All code for this part you can find in [front-end](https://github.com/RodionChachura/simple-blog-front/tree/part-4) and [back-end](https://github.com/RodionChachura/simple-blog-back/tree/part-4) repositories.

## Back-end

For listed features we want our back-end to have two additional endpoints. One to return recent stories and one to like or unlike specific story.

### GET: api/stories

For now, we won’t bother ourselves with pagination and make endpoint return all stories. Let’s make pagination to be topic of another part:)

```cs:title=StoriesController.cs
...
[HttpPost("{id}/toggleLike")]
public ActionResult ToggleLike(string id)
{
    var userId = HttpContext.User.Identity.Name;

    var story = storyRepository.GetSingle(s => s.Id == id, s => s.Likes);
    if (userId == story.OwnerId) return BadRequest("You can't like your own story");

    var existingLike = story.Likes.Find(l => l.UserId == userId);
    if (existingLike == null)
    {
        likeRepository.Add(new Like
        {
            UserId = userId,
            StoryId = id
        });
    }
    else 
    {
        likeRepository.Delete(existingLike);
    }
    likeRepository.Commit();
        
    return NoContent();
}
...
```

At first, let’s describe the view model for stories view and add configuration for *Automapper*.

```cs:title=StoryViewModel.cs
using System.Collections.Generic;

namespace Blog.API.ViewModels
{
    public class StoryViewModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public long PublishTime { get; set; }
        public string OwnerUsername { get; set; }
    }
}
```

```cs:title=MappingProfile.cs
...
CreateMap<Story, StoryViewModel>()
                .ForMember(s => s.OwnerUsername, map => map.MapFrom(s => s.Owner.Username));
...
```

Action in *StoriesController* that will return all stories.

```cs:title=StoriesController.cs
...
[HttpGet()]
public ActionResult<StoriesViewModel> GetStories()
{
    var stories = storyRepository.AllIncluding(s => s.Owner);
    return new StoriesViewModel {
        Stories = stories.Select(mapper.Map<StoryViewModel>).ToList()
    };
}
...
```

### POST api/stories/{id}/toggleLike

First, we need *Like* entity.

```cs:title=Like.cs
namespace Blog.Model
{
  public class Like
  {
    public string StoryId { get; set; }
    public Story Story { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }
  }
}
```

Also, we need to create the new method in *BlogContext* class for *Like* entity configuration.

```cs:title=LikeRepository.cs
using Blog.Data.Abstract;
using Blog.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Blog.Data.Repositories
{
    public class LikeRepository : ILikeRepository
    {
        private BlogContext _context;
        public LikeRepository(BlogContext context)
        {
            _context = context;
        }

        public void Add(Like entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<Like>(entity);
            _context.Set<Like>().Add(entity);
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Delete(Like entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<Like>(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }
    }
}
```

Updated *User* and *Story* models you can find [here](https://github.com/RodionChachura/simple-blog-back/tree/dev/Blog.Model/Entities).

Since *Like* not implement *IEntityBase* we can’t inherit *EntityBaseRepository*.

```cs:title=LikeRepository.cs
using Blog.Data.Abstract;
using Blog.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Blog.Data.Repositories
{
    public class LikeRepository : ILikeRepository
    {
        private BlogContext _context;
        public LikeRepository(BlogContext context)
        {
            _context = context;
        }

        public void Add(Like entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<Like>(entity);
            _context.Set<Like>().Add(entity);
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Delete(Like entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<Like>(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }
    }
}

```

Finally, action in *StoriesController* to toggle like for specific story.

```cs:title=StoriesController.cs
...
[HttpPost("{id}/toggleLike")]
public ActionResult ToggleLike(string id)
{
    var userId = HttpContext.User.Identity.Name;

    var story = storyRepository.GetSingle(s => s.Id == id, s => s.Likes);
    if (userId == story.OwnerId) return BadRequest("You can't like your own story");

    var existingLike = story.Likes.Find(l => l.UserId == userId);
    if (existingLike == null)
    {
        likeRepository.Add(new Like
        {
            UserId = userId,
            StoryId = id
        });
    }
    else 
    {
        likeRepository.Delete(existingLike);
    }
    likeRepository.Commit();
        
    return NoContent();
}
...
```

### Blog.Mocker Project

In the previous part, we have made the script that populates the database with data from Medium. Now we can update this script so that we will have some likes in mock stories.

```cs:title=Blog.Mocker.cs
class Program
{
    ...
    static List<Like> GenerateLikes(Pack pack)
    {
        return pack.Users.SelectMany(user => {
            var notUserStories = pack.Stories.Where(s => s.OwnerId != user.Id).ToList();
            var numberOfLikes = Convert.ToInt32((new Random()).Next(notUserStories.Count) * 0.2);

            List<Story> inner(List<Story> result, List<Story> storiesLeft, int iterationsLeft) {
                if (iterationsLeft == 0) return result;

                var storyIndex = (new Random()).Next(storiesLeft.Count);
                var newResult = result.Concat(new List<Story> { storiesLeft[storyIndex] }).ToList();
                var newStoriesLeft = storiesLeft.Where((_, i) => i != storyIndex).ToList();

                return inner(newResult, newStoriesLeft, iterationsLeft - 1);
            }

            var storiesToLike = inner(new List<Story> {}, notUserStories, numberOfLikes);
            var likes = storiesToLike.Select(s => new Like
            {
                UserId = user.Id,
                StoryId = s.Id
            });
            return likes;
        }).ToList();
    }
    
    static async Task Main(string[] args)
    {
        ...
        var likeRepository = new LikeRepository(blogContext);
        var likes = GenerateLikes(new Pack { Users = pack.Users, Stories = stories });
        likes.ForEach(likeRepository.Add);
        likeRepository.Commit();
        Console.WriteLine($"{likes.Count} new likes added");
    }
}
```

## Front-end

On front-end part, we need to make a page where all stories will be listed and update already implemented story page with likes feature.

### Stories

This page, for now, will list stories. First, let’s create a stateless component for story card.

```js:title=story-card.js
import React from 'react'
import styled from 'styled-components'

import { CardContent, Typography } from '@material-ui/core'
import StoryCardContainer from '../story-card-container'
import Tag from '../tag'

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

export default ({ title , dateText, onClick, ownerUsername, tags }) => {
  return (
    <StoryCardContainer onClick={onClick}>
      <CardContent>
        <Typography style={{ marginBottom: 16, fontSize: 14 }} color='textSecondary'>
          {dateText}
        </Typography>
        <Typography style={{ height: 120 }} variant="headline" component="h2">
          {title}
        </Typography>
        <TagsContainer style={{ height: 100 }}>
          {tags.map(tag => (
            <Tag
              key={tag}
              label={tag}
            />
          ))}
        </TagsContainer>
        <Typography style={{ marginBottom: 16, fontSize: 14 }}>
          written by {ownerUsername}
        </Typography>
      </CardContent>
    </StoryCardContainer>
  )
}
```

And page itself.

```jsx:title=index.js
import _ from 'lodash'
import React from 'react'

import Page from '../page-wrapper'
import { connectTo } from '../../utils/generic';
import StoriesContainer from '../stories-container';
import StoryCard from './story-card'
import { toStory } from '../../actions/navigation';
import { timestampForHuman } from '../../utils/time';

export default connectTo(
  state => state.stories,
  { toStory },
  ({ stories, toStory }) => (
    <Page>
      <StoriesContainer>
        {_.sortBy(stories, ['publishTime']).reverse().map((story, number) => {
          const date = timestampForHuman(story.publishTime)
          const dateText = `Published on ${date}`

          return (
            <StoryCard
              title={story.title}
              ownerUsername={story.ownerUsername}
              tags={story.tags}
              key={number}
              dateText={dateText}
              onClick={() => toStory(story.id)}
            />
          )
        })}
      </StoriesContainer>
    </Page>
  )
)
```

We will omit other parts of the implementation of stories page since they are quite simple.

### Story

We already have the story page, and now we will update it with likes feature. Let’s add a new *action*, *reducer* part, and *saga*.

```js:title=update-story.js
// actions/story.js
export const toggleLike = createAction()

// reducers/story.js
[a.toggleLike]: (state) => ({
  ...state,
  liked: !state.liked,
  likesNumber: state.liked ? state.likesNumber - 1 : state.likesNumber + 1
})

// sagas/story.js
export function* toggleLike() {
  const { navigation: { storyId } } = yield select()
  yield callWith401Handle(post, TOGGLE_LIKE(storyId))
}
```

Finally, the updated story component.

```jsx:title=story.js
import React from 'react'
import { Editor } from 'slate-react'
import { Typography, IconButton } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic';

import ContentContainer from '../content-container'
import Mark from '../editor/mark'
import Node from '../editor/node'
import Page from '../page-wrapper'
import Tag from '../tag'
import { timestampForHuman } from '../../utils/time';
import * as actions from '../../actions/story'

const Info = styled.div`
  margin: 20px;
`

const Chips = styled.div`
  display: flex;
  flex-direction: row;
`

const Likes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LikesNumber = styled.p`
  margin-left: 10px;
`

export default connectTo(
  state => ({
    ...state.story,
    userId: state.auth.id
  }),
  actions,
  ({ title, content, publishTime, ownerUsername, ownerId, tags, userId, likesNumber, liked, toggleLike }) => {
    return (
      <Page>
        <ContentContainer>
          <Info>
            <Typography variant="subheading" gutterBottom>
              author: {ownerUsername}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {timestampForHuman(publishTime)}
            </Typography>
          </Info>
          <Typography variant="display2" gutterBottom>{title}</Typography>
          { content && (
            <Editor
              readOnly
              style={{ paddingTop: '20px' }}
              value={content}
              renderNode={Node}
              renderMark={Mark}
            />
          )}
          <Chips>
            {
              tags.map(tag => (
                <Tag
                  label={tag}
                  key={tag}
                />
              ))
            }
          </Chips>
          <Likes>
            <IconButton
              disabled={userId === ownerId}
              onClick={toggleLike}
            >
              {liked ? <Favorite color='secondary' /> : <FavoriteBorder color='secondary'/>}
            </IconButton>
            <LikesNumber>{likesNumber}</LikesNumber>
          </Likes>
        </ContentContainer>
      </Page>
    )
  }
)
```

In the [next part](/blog/asp-react-blog/likes-notifications), we will add real-time notifications for likes.

