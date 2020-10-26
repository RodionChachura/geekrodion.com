---
date: "2018-10-05"
title: "Populating Database with Blog Posts from Medium"
description: "the goal for this part is to write a script that will populate PostgreSQL with mock data"
category: "programming"
keywords: [ASP.NET Core, React, Redux, Tutorial, Blog]
featuredImage: main.png
partNumber: 3
resources: [
  GitHub https://github.com/RodionChachura/simple-blog-back/tree/part-3 Back-end Code,
  GitHub https://github.com/RodionChachura/simple-blog-front/tree/part-2 Front-end Code
]
---

![](/main.png)

## Goal for this part

Before we start implementing features like stories search, likes or comments we want to have some data in our DB. So the goal for this part is to write a script that will populate our database with mock data.

![demo](/demo.gif)

## Back-end

This part will have only back-end part. We will write a script that will fetch users stories from Medium and save them in our format.

Let’s start by creating a new project.

```shell{ promptUser: geekrodion }
dotnet new console -o Blog.Mocker
```

### IMockPacker Interface

Now, we want to specify what we mean by mock data. It will be just a list of users and a list of stories. With time we can extend our pack, but for now, this set of data is sufficient.

```cs:title=Pack.cs
using System.Collections.Generic;
using Blog.Model;

namespace Blog.Mocker
{
    public class Pack
    {
        public List<User> Users { get; set; } = new List<User>();
        public List<Story> Stories { get; set; } = new List<Story>();
    }
}
```

In this part, we will use Medium to get mock data, but maybe someday we will want to use some other source. So we will make an interface for our mock data generator.

```cs:title=IMocksPacker.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Blog.Mocker;

namespace Blog.Mocker.Abstraction
{
    public interface IMocksPacker
    {
        Task<Pack> GetPack(List<string> usernames);
    }
}
```

### Medium

The simplest method for getting user stories from Medium appears to be fetching RSS feed. We will not take info about the user from this feed but only take some fields from the stories he made.

```cs:title=Medium.cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;
using Blog.API.Services;
using Blog.Mocker.Abstraction;
using Blog.Model;
using Microsoft.SyndicationFeed;
using Microsoft.SyndicationFeed.Rss;

namespace Blog.Mocker
{
  public class Medium : IMocksPacker
  {
    const string FEEDS_URL = "https://medium.com/feed/";
    const string BASIC_CONTENT = "{\"object\":\"value\",\"document\":{\"object\":\"document\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"heading-two\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\": \"TITLE\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]}]}}";
    public async Task<Pack> GetPack(List<string> usernames)
    {
      var client = new HttpClient();
      var authService = new AuthService(null, 0);
      var users = usernames.Select(username => new User
        {
          Id = username,
          Username = username,
          Email = username + "@mail.com",
          Password = authService.HashPassword(username + username),
        }
      ).ToList();

      var urls = usernames.Select(username => FEEDS_URL + "@" + username);
      var feedStrings = await Task.WhenAll(
        urls.Select(async url => await client.GetStringAsync(url))
      );
      var storiesList = await Task.WhenAll(
        feedStrings.Select(async (feedString, feedIndex) => {
          using(var xmlReader = XmlReader.Create(new StringReader(feedString)))
          {
            var stories = new List<Story>();
            var feedReader = new RssFeedReader(xmlReader);
            while (await feedReader.Read())
            {
              var type = feedReader.ElementType;
              if (type == SyndicationElementType.Item)
              {
                var item = await feedReader.ReadItem();   
                
                var time = item.Published.ToUnixTimeSeconds(); 
                var story = new Story
                {
                  Id = Guid.NewGuid().ToString(),
                  Title = item.Title,
                  Content = BASIC_CONTENT.Replace("TITLE", item.Title),
                  Tags = item.Categories.Select(c => c.Name).ToList(),
                  CreationTime = time,
                  LastEditTime = time,
                  PublishTime = time,
                  Draft = false,
                  OwnerId = users[feedIndex].Id
                };
                stories.Add(story);
              }
            }
            return stories;
          }
        })
      );
      var pack = new Pack
      {
        Users = users,
        Stories = storiesList.SelectMany(s => s).ToList()
      };

      return pack; 
    }
  }
}
```

In order to use RSS helpers, we need to install an additional library.

```shell{ promptUser: geekrodion }
dotnet add package Microsoft.SyndicationFeed.ReaderWriter
```

### Program

Our *Program* file will consist of this steps.

1. Get mock set of data by passing list of usernames to Medium instance method.

1. Specify *BlogContext*.

1. Saving users to DB.

1. Saving stories to DB.

```cs:title=Program.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blog.Data;
using Blog.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Blog.Mocker
{
    class Program
    {
        static readonly List<string> MEDIUM_USERS = new List<string> {
            "geekrodion",
            "umairh",
            "tomkuegler",
            "benjaminhardy",
            "krisgage",
            "dan.jeffries",
            "zdravko",
            "JessicaLexicus",
            "tiffany.sun",
            "Michael_Spencer",
            "larrykim",
            "nicolascole77",
            "alltopstartups",
            "ngoeke"
        };
        static async Task Main(string[] args)
        {
            var medium = new Medium();
            var pack = await medium.GetPack(MEDIUM_USERS);

            var contextOptions = new DbContextOptionsBuilder<BlogContext>()
                .UseNpgsql("Server=localhost;Database=blog;Username=blogadmin;Password=blogadmin")
                .Options;
            var blogContext = new BlogContext(contextOptions);

            var usersRepository = new UserRepository(blogContext);
            var users = pack.Users.Where(u => usersRepository.IsUsernameUniq(u.Username)).ToList();
            users.ForEach(usersRepository.Add);
            usersRepository.Commit();
            Console.WriteLine($"{users.Count} new users added");

            var storiesRepository = new StoryRepository(blogContext);
            var stories = pack.Stories.Where(s => 
                storiesRepository.GetSingle(os => os.Title == s.Title && os.PublishTime == s.PublishTime) == null
            ).ToList();
            stories.ForEach(storiesRepository.Add);
            storiesRepository.Commit();
            Console.WriteLine($"{stories.Count} new stories added");
        }
    }
}
```

In the [next part](/blog/asp-react-blog/likes), we will allow a user to like stories.
