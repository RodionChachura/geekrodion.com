---
date: "2018-09-28"
title: "JWT Authentication for ASP.NET Core + React/Redux App"
shortTitle: "Authentication"
description: "Adding JWT authentication to ASP.NET Core + React blog"
category: "programming"
keywords: [ASP.NET Core, React, Redux, Tutorial, Blog]
featuredImage: main.png
partNumber: 1
resources: [
  GitHub https://github.com/RodionChachura/simple-blog-back/tree/part-1 Back-end Code,
  GitHub https://github.com/RodionChachura/simple-blog-front/tree/part-1 Front-end Code
]
---

![](/main.png)

## Goal For This Part

The goal for the first part of the series is to make the app where you can log in and register.

![Signup and logout](/demo.gif)

## Back-end

The goal for the back-end part is to make REST API connected to the database. This API should have two endpoints so we can log in and register.

### Blog.Model Project

Let’s start by creating the project where all our entities(users, articles, comments) will be.

```shell{ promptUser: geekrodion }
dotnet new classlib -o Blog.Model
```

The first file we create in this directory will be `IEntityBase`.

```cs:title=IEntityBase.cs
namespace Blog.Model
{
    public interface IEntityBase
    {
        string Id { get; set; }
    }
}
```

With interface in place, we can create `User` entity.

```cs:title=User.cs
namespace Blog.Model
{
  public class User : IEntityBase
  {
    public string Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
  }
}
```

### Blog.Data Project

For now, this is all we need in `Blog.Model` project. Next project we want to create is `Blog.Data`.

```shell{ promptUser: geekrodion }
dotnet new classlib -o Blog.Data
```

The first file we create in this directory will be `IEntityBaseRepository`. This interface will describe the basic methods that will be useful for work with entities.

```cs:title=IEntityBaseRepository.cs
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Blog.Model;

namespace Blog.Data.Abstract
{
    public interface IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        IEnumerable<T> AllIncluding(
          params Expression<Func<T, object>>[] includeProperties
        );
        IEnumerable<T> GetAll();
        int Count();
        T GetSingle(string id);
        T GetSingle(Expression<Func<T, bool>> predicate);
        T GetSingle(
          Expression<Func<T, bool>> predicate,
          params Expression<Func<T, object>>[] includeProperties
        );
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteWhere(Expression<Func<T, bool>> predicate);
        void Commit();
    }
}
```

Now let’s create a generic class that will implement the interface.

```cs:title=EntityBaseRepository.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Blog.Data.Abstract;
using Blog.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Blog.Data;

namespace Blog.Data.Repositories
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T>
            where T : class, IEntityBase, new()
    {
        private BlogContext _context;

        public EntityBaseRepository(BlogContext context)
        {
            _context = context;
        }
        public virtual IEnumerable<T> GetAll()
        {
            return _context.Set<T>().AsEnumerable();
        }

        public virtual int Count()
        {
            return _context.Set<T>().Count();
        }
        public virtual IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query.AsEnumerable();
        }

        public T GetSingle(string id)
        {
            return _context.Set<T>().FirstOrDefault(x => x.Id == id);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().FirstOrDefault(predicate);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.Where(predicate).FirstOrDefault();
        }

        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public virtual void Add(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            _context.Set<T>().Add(entity);
        }

        public virtual void Update(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }
        public virtual void Delete(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }

        public virtual void DeleteWhere(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> entities = _context.Set<T>().Where(predicate);

            foreach(var entity in entities)
            {
                _context.Entry<T>(entity).State = EntityState.Deleted;
            }
        }

        public virtual void Commit()
        {
            _context.SaveChanges();
        }
    }
}
```

Now, when we want to create a new repository, we can inherit `EntityBaseRepository` and get basic functionality for the new repository.

```cs:title=UserRepository.cs
using Blog.Data.Abstract;
using Blog.Model;

namespace Blog.Data.Repositories {
    public class UserRepository : EntityBaseRepository<User>, IUserRepository {
        public UserRepository (BlogContext context) : base (context) { }

        public bool isEmailUniq (string email) {
            var user = this.GetSingle(u => u.Email == email);
            return user == null;
        }

        public bool IsUsernameUniq (string username) {
            var user = this.GetSingle(u => u.Username == username);
            return user == null;
        }
    }
}
```

The last class we want to add to the project is `BlogContext` that will inherit `DBContext` and will configure models and their relationships.

```cs
using System.Linq;
using Blog.Model;
using Microsoft.EntityFrameworkCore;

namespace Blog.Data
{
    public class BlogContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        
        public BlogContext(DbContextOptions<BlogContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            ConfigureModelBuilderForUser(modelBuilder);
        }

        void ConfigureModelBuilderForUser(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>()
                .Property(user => user.Username)
                .HasMaxLength(60)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(user => user.Email)
                .HasMaxLength(60)
                .IsRequired();
        }
    }
}
```

### Blog.API Project

At `Blog.API` we will have our REST API itself. Let’s start with `ViewModel` user will receive after authentication. It will contain the id of the user, JWT token for authentication and it’s expiration time.

```cs:title=AuthData.cs
namespace Blog.API.ViewModels
{
    public class AuthData
    {
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
        public string Id { get; set; }
    }
}
```

To receive this model we need auth service, that will be able to generate JWT token. Also, we put in it two methods that will hash the password and verify it.

```cs:title=AuthService.cs
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Blog.API.Services.Abstraction;
using Blog.API.ViewModels;
using CryptoHelper;
using Microsoft.IdentityModel.Tokens;

namespace Blog.API.Services
{
    public class AuthService: IAuthService
    {
        string jwtSecret;
        int jwtLifespan;
        public AuthService(string jwtSecret, int jwtLifespan)
        {
            this.jwtSecret = jwtSecret;
            this.jwtLifespan = jwtLifespan;
        }
        public AuthData GetAuthData(string id)
        {
            var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, id)
                }),
                Expires = expirationTime,
                // new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)), 
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
                        
            return new AuthData{
                Token = token,
                TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
                Id = id
            };
        }

    public string HashPassword(string password)
    {
      return Crypto.HashPassword(password);
    }

    public bool VerifyPassword(string actualPassword, string hashedPassword)
    {
      return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
    }
  }
}
```

With service in place, we can go to the `Startup` class and it alongside with `UserRepository`.

```cs:title=Startup.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.API.Services;
using Blog.API.Services.Abstraction;
using Blog.Data;
using Blog.Data.Abstract;
using Blog.Data.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Blog.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services
                .AddEntityFrameworkNpgsql()
                .AddDbContext<BlogContext>(options =>
                    options.UseNpgsql(
                        Configuration.GetConnectionString("BlogContext"),
                        o => o.MigrationsAssembly("Blog.API")
                    )
                );

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
            
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(Configuration.GetValue<string>("JWTSecretKey"))
                        )
                    };
                });

            
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddSingleton<IAuthService>(
                new AuthService(
                    Configuration.GetValue<string>("JWTSecretKey"),
                    Configuration.GetValue<int>("JWTLifespan")
                )
            );

            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
            ); 
            // app.UseHttpsRedirection();
            
            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
```

As you can see we not only inject our service but also add entity framework integration, JWT authentication, and options for JSON serializations. In `Startup` class, we used configuration variables for JWT authentication and database connection string. Let’s add them to `appsettings.json`.

```json:title=appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "BlogContext": "Server=localhost;Database=blog;Username=blogadmin;Password=blogadmin"
  },
  "JWTSecretKey": "bRhYJRlZvBj2vW4MrV5HVdPgIE6VMtCFB0kTtJ1m",
  "JWTLifespan": 2592000
}
```

And finally, it is time to create the auth controller!

```cs:title=AuthController.cs
using System;
using Blog.API.Services.Abstraction;
using Blog.API.ViewModels;
using Blog.Data.Abstract;
using Blog.Model;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        IAuthService authService;
        IUserRepository userRepository;
        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            this.authService = authService;
            this.userRepository = userRepository;
        }

        [HttpPost("login")]
        public ActionResult<AuthData> Post([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = userRepository.GetSingle(u => u.Email == model.Email);

            if (user == null) {
                return BadRequest(new { email = "no user with this email" });
            }

            var passwordValid = authService.VerifyPassword(model.Password, user.Password);
            if (!passwordValid) {
                return BadRequest(new { password = "invalid password" });
            }

            return authService.GetAuthData(user.Id);
        }

        [HttpPost("register")]
        public ActionResult<AuthData> Post([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var emailUniq = userRepository.isEmailUniq(model.Email);
            if (!emailUniq) return BadRequest(new { email = "user with this email already exists" });
            var usernameUniq = userRepository.IsUsernameUniq(model.Username);
            if (!usernameUniq) return BadRequest(new { username = "user with this email already exists" });

            var id = Guid.NewGuid().ToString();
            var user = new User
            {
                Id = id,
                Username = model.Username,
                Email = model.Email,
                Password = authService.HashPassword(model.Password)
            };
            userRepository.Add(user);
            userRepository.Commit();

            return authService.GetAuthData(id);
        }

    }
}
```

In our actions, we receive `ViewModels` and then by using `UserRepository` and `AuthService` we authenticate/register user.

### PostgreSQL Database

The only thing left is to create a user in PostgreSQL database.

```shell{ promptUser: geekrodion }
sudo -i -u postgres
psql
create user blogadmin;
alter user blogadmin with password 'blogadmin';
alter user blogadmin createdb;
```

After this, we can create and run migrations for our database.

```shell{ promptUser: geekrodion }
cd Blog.API
dotnet ef migrations add InitialMigration
dotnet ef database update
```

### Testing with Postman

Let’s run our back-end and send some request with Postman.

```shell{ promptUser: geekrodion }
cd Blog.API
dotnet run
```

![register](/register.png)

![login](/login.png)

![trying to register with existing email](/register-with-email.png)

## Front-end

## Setup

Let’s list main libraries that we will use on front-end side:

* [react](https://github.com/facebook/react)
* [redux](https://github.com/reduxjs/redux)
* [redux-saga](https://github.com/redux-saga/redux-saga)
* [redux-act](https://github.com/pauldijou/redux-act)
* [material-ui](https://github.com/mui-org/material-ui)
* [styled-components](https://github.com/styled-components/styled-components)

I already have a [post](/blog/redux-saga-cra) showing what I am doing after typing create-react-app in order to set up the redux environment. So we skip part describing the process of bootstrapping app.

### Implementation

Let’s start with action for the auth part.

```jsx:title=auth.js
import { put, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'

import { to } from '../actions/navigation'
import { receiveAuthData } from '../actions/auth'
import { LOGIN, REGISTER } from '../constants/api'
import { post } from '../utils/api'
import { startApp } from '../actions/generic'

const authSaga = (url, thanGoTo) =>
  function*({ payload: { values, reject } }) {
    try {
      const authData = yield call(post, url, values)
      yield put(receiveAuthData(authData))
      yield put(startApp())
      yield put(to(thanGoTo))
    } catch ({ status, message }) {
      yield call(reject, new SubmissionError(message))
    }
  }

export const submitLogin = authSaga(LOGIN, 'start')
export const submitRegister = authSaga(REGISTER, 'start')
```

In this sagas, we receive data from the redux form and send it to our back-end. If we receive an error, we showing those errors in form. Otherwise, we are going to start page.

Our main component for authorization is `AuthForm`.

```jsx:title=auth-form.js
import React from 'react'
import styled from 'styled-components'
import { Paper, Button } from '@material-ui/core'

import Logo from '../logo'
import Page from '../page-wrapper'
import { submitAsyncValidation} from '../../utils/forms'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Container = styled(Paper)`
  width: 320px;
  padding: 20px;
`


const SubmitButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`


const BottomText = styled(Button)`
  && {
    margin-top: 10px;
  }
`
const pageStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}

export default ({ handleSubmit, enabledSubmit, onSubmit, submitText, onBottomTextClick, bottomText, fields }) => {
  return (
    <Page style={pageStyle}>
      <Container>
        <Form
          onSubmit={submitAsyncValidation(handleSubmit, enabledSubmit, onSubmit)}
        >
          <Logo/>
          {fields}
          <SubmitButton type="submit" variant="outlined" disabled={!enabledSubmit}>{submitText}</SubmitButton>
        </Form>
      </Container>
      <BottomText onClick={onBottomTextClick} color='primary' size='small'>{bottomText}</BottomText>
    </Page>
  )
}
```

Then we can use this component in our login and register pages.

```jsx:title=login.js
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { submitLogin } from '../../actions/auth'
import { to } from '../../actions/navigation'
import { required, email, minLength6, lengthLessThan40 } from '../../validators/forms';
import { connectTo } from '../../utils/generic';
import { isValid} from '../../utils/forms'
import TextField from './text-field'
import AuthForm from './auth-form'

export default connectTo(
  state => ({
    enabledSubmit: isValid(state, 'login')
  }),
  { to, submitLogin },
  reduxForm({ form: 'login' })(
    ({
      handleSubmit,
      enabledSubmit,
      submitLogin,
      to
    }) => {
      const fields = [
        <Field
          name="email"
          key="email"
          component={TextField}
          label="Email"
          type="text"
          validate={[required, email]}
        />,
        <Field
          name="password"
          key="password"
          component={TextField}
          label="Password"
          type="password"
          validate={[required, minLength6, lengthLessThan40]}
        />
      ]
      return (
        <AuthForm
          fields={fields}
          handleSubmit={handleSubmit}
          enabledSubmit={enabledSubmit}
          onSubmit={submitLogin}
          submitText='Login'
          onBottomTextClick={() => to('register')}
          bottomText="Don't have an account? Register"
        />
      )
    }
  )
)
```

Now, if you have the running back-end, you can start front-end and register!

```shell{ promptUser: geekrodion }
npm start
```

In the [next part](/blog/asp-react-blog/creating-story), we will allow user to create articles.