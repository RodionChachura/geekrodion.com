---
date: "2018-09-28"
title: "Create and Edit Posts in ASP.NET Core + React/Redux Blog"
description: "Adding simple blog functionality to ASP.NET Core + React app"
category: "programming"
keywords: [ASP.NET Core, React, Redux, Tutorial, Blog]
featuredImage: main.png
headline: "Create and Edit Posts in ASP.NET Core + React/Redux App"
resources: [
  GitHub https://github.com/RodionChachura/simple-blog-back
]
---

![](/main.png)

## Goal for this part

Let’s start the second part of this series by listing features we going to make as user stories.
1. As a user, I want to **be able to write a story** so that I will be able to share them with others when publish.
2. As a user, I want to **save and publish a story** so that I can share them with others.
3. As a user, I want to **view both drafts and published stories** so that I knew what stories I have.
4. As a user, I want to **edit a story** so that I can update it.
5. As a user, I want to **delete a story** so that I can remove it when I see that peoples don’t like it.

![demo](/demo.gif)

## Back-end

To make this user stories happen, we want our back-end to have endpoints that allow us to work with stories.

## Blog.Model Project

For this part, we want one new `Entity`. We are going to keep the content of the story as JSON string.

```cs:title=Story.cs
using System.Collections.Generic;

namespace Blog.Model
{
  public class Story : IEntityBase
  {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public List<string> Tags { get; set; } = new List<string>();
    public long CreationTime { get; set; }
    public long LastEditTime { get; set; }
    public long PublishTime { get; set; }
    public bool Draft { get; set; }

    public User Owner { get; set; }
    public string OwnerId { get; set; }
  }
}
```

## Blog.Data Project

Only one new repository for stories.

```cs:title=StoryRepository.cs
using Blog.Data.Abstract;
using Blog.Model;

namespace Blog.Data.Repositories
{
    public class StoryRepository : EntityBaseRepository<Story>, IStoryRepository 
    {
        public StoryRepository (BlogContext context) : base (context) { }

        public bool IsOwner(string storyId, string userId)
        {
            var story = this.GetSingle(storyId);
            return story.OwnerId == userId;
        }
    }
}
```

And we need to update the Story model by adding this field.

```cs
public ICollection<Story> Stories { get; set; }
```

Also, we need to add the method for Story configuration in BlogContext class.

```cs:title=ConfigureModelBuildForStory.cs
void ConfigureModelBuilderForStory(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Story>().ToTable("Story");
    modelBuilder.Entity<Story>()
        .Property(s => s.Title)
        .HasMaxLength(60);

    modelBuilder.Entity<Story>()
        .Property(s => s.OwnerId)
        .IsRequired();

    modelBuilder.Entity<Story>()
        .HasOne(s => s.Owner)
        .WithMany(u => u.Stories)
        .HasForeignKey(s => s.OwnerId);
}
```

## Blog.API Project

For this part, we need a few new [view models](https://github.com/RodionChachura/simple-blog-back/tree/part-2/Blog.API/ViewModels).

As we can see, the number of view models increased significantly in comparison with the previous part. And if it will continue this way we will be sick and tired of converting models to view models and back in our controllers. But there is a rescue — `AutoMapper`.

Let’s create the `MappingProfile` where we will specify models we want to automap.

```cs:title=MappingProfile.cs
using AutoMapper;
using Blog.Model;

namespace Blog.API.ViewModels.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Story, StoryDetailViewModel>()
                .ForMember(s => s.OwnerUsername, map => map.MapFrom(s => s.Owner.Username));
            CreateMap<Story, DraftViewModel>();
            CreateMap<Story, StoryViewModel>();
        }
    }
}
```

Now when we want to make from `Story` `StoryDetailViewModel`, we can do it like this.

```cs
var storyDetailVM = mapper.Map<StoryDetailViewModel>(story);
```

Rather than doing it this way:

```cs
var storyDetailVM = new StoryDetailViewModel {
    Id = story.Id,
    Title = story.Title,
    Content = story.Content,
    Tags = story.Tags,
    PublishTime = story.PublishTime,
    OwnerId = story.OwnerId,
    OwnerUsername = story.Owner.Username
};
```

And of course, we need to update `ConfigureServices` in our `Startup` class so that we can inject `Mapper` in our controllers.

```cs
var mappingConfig = new MapperConfiguration(mc =>
   mc.AddProfile(new MappingProfile())
);
services.AddSingleton(mappingConfig.CreateMapper());
```

The final step is to add a controller for stories.

```cs:title=StoriesController.cs
using System;
using System.Linq;
using AutoMapper;
using Blog.API.Services.Abstraction;
using Blog.API.ViewModels;
using Blog.Data.Abstract;
using Blog.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        IStoryRepository storyRepository;
        IMapper mapper;

        public StoriesController(IStoryRepository storyRepository, IMapper mapper)
        {
            this.storyRepository = storyRepository;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public ActionResult<StoryDetailViewModel> GetStoryDetail(string id)
        {
            var story = storyRepository.GetSingle(s => s.Id == id, s => s.Owner);
            return mapper.Map<StoryDetailViewModel>(story);
        }
        
        [HttpPost]
        public ActionResult<StoryCreationViewModel> Post([FromBody]UpdateStoryViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var ownerId = HttpContext.User.Identity.Name;
            var creationTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            var storyId = Guid.NewGuid().ToString();
            var story = new Story {
                Id = storyId,
                Title = model.Title,
                Content = model.Content,
                Tags = model.Tags,
                CreationTime = creationTime,
                LastEditTime = creationTime,
                OwnerId = ownerId,
                Draft = true
            };

            storyRepository.Add(story);
            storyRepository.Commit();

            return new StoryCreationViewModel {
                StoryId = storyId
            };
        }

        [HttpPatch("{id}")]
        public ActionResult Patch(string id, [FromBody]UpdateStoryViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var ownerId = HttpContext.User.Identity.Name;
            if (!storyRepository.IsOwner(id, ownerId)) return Forbid("You are not the owner of this story");

            var newStory = storyRepository.GetSingle(id);
            newStory.Title = model.Title;
            newStory.LastEditTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            newStory.Tags = model.Tags;
            newStory.Content = model.Content;

            storyRepository.Update(newStory);
            storyRepository.Commit();

            return NoContent();
        }

        [HttpPost("{id}/publish")]
        public ActionResult Post(string id)
        {
            var ownerId = HttpContext.User.Identity.Name;
            if (!storyRepository.IsOwner(id, ownerId)) return Forbid("You are not the owner of this story");

            var newStory = storyRepository.GetSingle(id);
            newStory.Draft = false;
            newStory.PublishTime = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();

            storyRepository.Update(newStory);
            storyRepository.Commit();

            return NoContent();
        }

        [HttpGet("drafts")]
        public ActionResult<DraftsViewModel> Get()
        {
            var ownerId = HttpContext.User.Identity.Name;

            var drafts = storyRepository.FindBy(story => story.OwnerId == ownerId && story.Draft);
            return new DraftsViewModel {
                Stories = drafts.Select(mapper.Map<DraftViewModel>).ToList()
            };
        }

        [HttpGet("user/{id}")]
        public ActionResult<StoriesViewModel> Get(string id)
        {
            var stories = storyRepository.FindBy(story => story.OwnerId == id && !story.Draft);
            return new StoriesViewModel {
                Stories = stories.Select(mapper.Map<StoryViewModel>).ToList()
            };
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var ownerId = HttpContext.User.Identity.Name;
            if (!storyRepository.IsOwner(id, ownerId)) return Forbid("You are not the owner of this story");

            storyRepository.DeleteWhere(story => story.Id == id);
            storyRepository.Commit();

            return NoContent();
        }
    }
}
```

The only thing left, is to update our database by running the migration.

## Front-end

Front-end for this part will consist of three pages:

1. `Editor`. The page where we can create a story or edit an existing one.
2. `YourStories`. The page where a user can see his drafts and published stories.
3. `Story`. The page with published story.

## Editor

Let’s start with actions for story editor.

```js:title=editor.js
import { createAction } from 'redux-act'

export const changeTitle = createAction()

export const toggleEffect = createAction()
export const save = createAction()
export const changeContent = createAction()
export const startRequest = createAction()
export const successfulSave = createAction()
export const successfulCreation = createAction()
export const changeLink = createAction()
export const exitLinkPrompt = createAction()
export const submitLink = createAction()

export const toggleTagsMenu = createAction()
export const editTag = createAction()
export const submitTag = createAction()
export const deleteTag = createAction()
export const publish = createAction()

export const receiveStoryForEdit = createAction()
export const clear = createAction()
```

Then, let’s create sagas for save and publish actions.


```js:title=editor.js
import { put, select } from 'redux-saga/effects'

import { CREATE_STORY, UPDATE_STORY, PUBLISH_STORY } from '../constants/api'
import { post, patch } from '../utils/api'
import { callWith401Handle } from './api'
import { successfulSave, successfulCreation } from "../actions/editor";
import { toStory } from '../actions/navigation'

export function* storyUpdatePayload() {
  const { editor: { title, content, tags } } = yield select()
  return {
    title,
    content: JSON.stringify(content.toJSON()),
    tags
  }
}

export function* save() {
  const { editor: { storyId } } = yield select()
  const payload = yield storyUpdatePayload()
  if (!storyId) {
    const { storyId } = yield callWith401Handle(post, CREATE_STORY, payload)
    yield put(successfulCreation(storyId))
  } else {
    yield callWith401Handle(patch, UPDATE_STORY(storyId), payload)
    yield put(successfulSave())
  }
}

export function* publish() {
  const { editor: { changesSaved, storyId } } = yield select()
  if (!changesSaved) {
    yield save()
  }
  yield callWith401Handle(post, PUBLISH_STORY(storyId))
  yield put(toStory(storyId))
}
```

Picture yourself writing a story in a cafe. But suddenly your laptop is out of charge. And since you didn’t push the save button — an article is gone. It sucks! So we are going to make a [saga](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/sagas/generic.js#L65) that will trigger save action if something changes.

```js:title=generic.js
...
export function* startApp() {
  window.history.pushState({}, '', '')

  function* ticking() {
    yield put(tickAction())
    yield call(delay, TICK)
    yield* ticking()
  }
  yield* ticking()
}

export function* tick() {
  const { navigation: { page } } = yield select()
  if (page === 'editor') {
    const { editor: { lastSave, lastEdit, saving } } = yield select()
    if (!saving && lastEdit && lastEdit > lastSave && Date.now() - lastSave > SAVE_PERIOD) {
      yield put(save())
    }
  }
}
...
```

[Reducer](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/reducers/editor.js) for the editor is quite bulky:) So we will not list the whole reducer here.

To implement editor page we need a number of components. Let’s list them.

* [Editor](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/editor.js) will wrap [slate.js](https://github.com/ianstormtaylor/slate) component for making reach text editors.
* [EffectsMenu](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/effects-menu.js) will list possible features of our editor such as making text bold, insert link or make a bulleted list.
* [LinkDialog](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/link-dialog.js) will allow a user to paste URL of link or image.
* [Mark](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/mark.js) will specify how to italic, bold or code text.
* [Node](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/node.js) as a Mark will render specific elements of the editor, such as lists and headings.
* [Publish](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/publish.js) and [Save](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/save.js) will be buttons connected to the state.
* [Title](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/title.js) will be the text field for article’s title.
* [TagsDialog](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/components/editor/tags-dialog.js) will be a component where a user can specify tags for his article.

And the index where everything comes together.

```jsx:title=index.js
import React from 'react'
import styled from 'styled-components'

import Page from '../page-wrapper'
import EffectsMenu from './effects-menu'
import Title from './title'
import Save from './save'
import Publish from './publish'
import Editor from './editor'
import LinkDialog from './link-dialog'
import TagsDialog from './tags-dialog'
import { connectTo } from '../../utils/generic';
import ContentContainer from '../content-container'

const SIDE_PADDING = 50;

const TopLine = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${SIDE_PADDING}px;
`

export default connectTo(
  state => state.editor,
  {},
  ({ linkPrompt, tagsMenuOpen }) => {
    return (
      <Page style={{ padding: `0 ${SIDE_PADDING}px` }}>
        <TopLine>
          <Save/>
          <Publish/>
        </TopLine>
        <ContentContainer>
          <Title/>
          <Editor/>
        </ContentContainer>
        <EffectsMenu/>
        { linkPrompt && <LinkDialog/> }
        { tagsMenuOpen && <TagsDialog/> }
      </Page>
    )
  }
```

### YourStories

As usual, let’s start with actions.

```js:title=your-stories.js
import { createAction } from 'redux-act'

export const selectTab = createAction()
export const remove = createAction()
export const edit = createAction()
export const receiveStoriesForTab = createAction()
export const clear = createAction()
```

Next — sagas.

```js:title=your-stories.js
import { select, put } from 'redux-saga/effects'
import { callWith401Handle } from './api'
import { DRAFTS, USER_STORIES, DELETE_STORY } from '../constants/api'
import { get, del } from '../utils/api'
import { receiveStoriesForTab } from '../actions/your-stories';
import { receiveStoryForEdit } from '../actions/editor';
import { to } from '../actions/navigation'

export function* selectTab({ payload }) {
  const { yourStories, auth: { id } } = yield select()
  if (yourStories[payload]) return

  const endpoint = payload === 'drafts' ? DRAFTS : USER_STORIES(id)
  const { stories } = yield callWith401Handle(get, endpoint)
  yield put(receiveStoriesForTab({ stories, tab: payload }))
}

export function* remove({ payload }) {
  yield callWith401Handle(del, DELETE_STORY, payload)
}

export function* edit({ payload }) {
  const { yourStories: { drafts, published } } = yield select()

  const story = [drafts, published].withoutUndef_().flatten_().find(story => story.id === payload)
  yield put(receiveStoryForEdit(story))
  yield put(to('editor'))
}
```

Such simple sagas, but WTF is this?

```js
withoutUndef_().flatten_()
```

It is kind of hack that I carry in my js projects. At the start of the app, I run code that will extend the array prototype. You can find it [here](https://github.com/RodionChachura/simple-blog-front/blob/part-2/src/utils/array-extensions.js).

Reducer for this page not even worth the mention:)

Finally, the index of the component.

```jsx:title=index.js
import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/your-stories'
import StoryCard from './story-card'
import Page from '../page-wrapper'
import { toStory } from '../../actions/navigation';
import { timestampForHuman } from '../../utils/time';

const StoriesContainer = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default connectTo(
  state => state.yourStories,
  ({ ...actions, toStory }),
  ({ selectTab, remove, drafts, published, tab, edit, toStory }) => {
    const stories = { drafts, published }[tab]
    const tabs = ['drafts', 'published']
    const value = ['drafts', 'published'].indexOf(tab)
    return (
      <Page>
        <AppBar position='static'>
          <Tabs value={value} onChange={(_, v) => selectTab(tabs[v])}>
            <Tab label='drafts' />
            <Tab label='published' />
          </Tabs>
        </AppBar>
        <StoriesContainer>
          { stories && stories.map((story, number) => {
            const dateValue = story[tab === 'published' ? 'publishTime' : 'lastEditTime']
            const date = timestampForHuman(dateValue)
            const dateText = `${tab === 'published' ? 'Published on' : 'Last edit'} ${date}`
            return (
              <StoryCard
                key={number}
                title={story.title}
                dateText={dateText}
                onEdit={() => edit(story.id)}
                onDelete={() => remove(story.id)}
                onClick={() => tab === 'drafts' ? edit(story.id) : toStory(story.id) }
              />
            )
          })}
        </StoriesContainer>
      </Page>
    )
  }
)
```

### Story

For now, `Story` is just a read-only page. And it has only one action.

```js:title=story.js
import { createAction } from 'redux-act'

export const receiveStory = createAction()
```

It doesn’t have saga and reducer is reducer handles only one action.
To render content we will use, previously mentioned Mark, Node components and `slate.js` library.

```jsx:title=index.js
import React from 'react'
import { Editor } from 'slate-react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Chip } from '@material-ui/core'

import { connectTo } from '../../utils/generic';

import ContentContainer from '../content-container'
import Mark from '../editor/mark'
import Node from '../editor/node'
import Page from '../page-wrapper'
import { timestampForHuman } from '../../utils/time';

const Info = styled.div`
  margin: 20px;
`

const Chips = styled.div`
  display: flex;
  flex-direction: row;
`

export default connectTo(
  state => state.story,
  {},
  ({ title, content, publishTime, ownerUsername, tags }) => {
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
                <Chip
                  label={tag}
                  style={{ margin: 10 }}
                  key={tag}
                />
              ))
            }
          </Chips>
        </ContentContainer>
      </Page>
    )
  }
)
```

In the [next part](/blog/asp-react-blog/mock-data), we will populate our database with mock data.