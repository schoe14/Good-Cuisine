# Good Cuisine

We all have preferences on foods or even dietary restrictions, so we decided to make an app that makes it easier to filter recipes by these parameters and save recipes  in one location and easily accessible.

## Demo of Application

Desktop                    |  Mobile
:-------------------------:|:-------------------------:
![Desktop Demo](./public/gifs/Good_Cuisine_Desktop_Demo.gif)  |  ![Mobile Demo](./public/gifs/Good_Cuisine_Mobile_Demo.gif)

## Live Link
- Launch the application [here](https://good-cuisine.herokuapp.com/)

## Technologies Used

- Browser Based:
  - Languages
    - HTML, CSS, Sass, JavaScript/jQuery

  - CSS Framework
    - Bootstrap

  - Other
    - Handlebars, Toastr, 
    - Adobe Illustrator
    
- Deployment:
  - Web Deployment
    - Heroku

  - Server-Side Deployment
    - Express.js, Node.js, 
    - User Authentication 
    - (Passport, Bcrypt),
    - Sequelize

  - Other
    - Dotenv

- API/Databse
  - Third-party API
    - Edamam Recipe Search API

  - Database
    - MySQL

## Features
- Create a user account
  - User accounts allow you to set cuisine preferences
  - Save recipes to be viewed later
  - Page exists to manage your account
    - Add
    - Update
    - Delete
- Sign in security
  - Your account is safe
  - Only if you know the email and password can you sign into an existing account
- Search for recipes
  - A public and member recipe search page exists
  - Choose a key word for type of food to search
  - Optional parameters exist
    - Dietary Preferences
    - Health Preferences
    - Calory Amount
  - For members only, recipes can be saved
  - Saved recipe page displays all recipes a user with an account has saved
  
## User Story

```sh
As someone who eats

  - I want new recipe ideas
  - I want to know the nutritional facts of my food
  - I want to know the ingredients and instructions of my recipe
  - I want dietary options to control what kind of recipes are shown
  - I want to be able to save recipes I like
```

## Acceptance Criteria

```sh
Given that I created an account and provide a key search term and any optional search parameters

When I hit "search"

Then I will have informational recipe cards that I can choose to save for later
```

## Contributors
- Madeline Jimenez [gitHub](https://github.com/mijimenez)

- Christian Jones [gitHub](https://github.com/jonesec2)

- Seohui Choe [gitHub](https://github.com/schoe14)
