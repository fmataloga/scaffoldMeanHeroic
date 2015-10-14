# Scaffold Mean Heroic
This is a Heroic Scaffold for the MEAN stack using MaterializeCSS - Making your App in less than 5 minutes.  
This gives MEAN Stack a base to start making applications with the tools most used in the world as it is MongoDB , Express, AngularJs , NodeJs , also brings a sample login to continue the work structure.

## Pre-Requisites
> 1.   [Node.js.](https://nodejs.org)
> 2.   [MongoDB.](https://www.mongodb.org/)
> 3.   [Gulp.](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Usage
Clone Repository
```sh
$ npm install // Install all the npm dependencies
$ gulp server // Initializes Nodemon to restart the server automatically
$ gulp watch-front // Create a union of all your front-end to be used in a single call
```

## Folders Directories

| - **bin/**  
| - - - - - - www.js  
| - **models/**  
| - - - - - - Users.js  // Mongoose Model For Users  
| - **public/**  
| - - - - - - **images/**  
| - - - - - - - - - - default-user.png  //login default logo  
| - - - - - - **includes/**  
| - - - - - - - - - - concat.js  //  Merge All The Files Inside The Javascript Folder using the command gulp watch-front  
| - - - - - - **javascript/**  
| - - - - - - - - - - **controllers**/  
| - - - - - - - - - - - - - - bootstrapController.js  // Run the functions inside the layout index.ejs  
| - - - - - - - - - - - - - - homeController.js        
| - - - - - - - - - - - - - - loginController.js      
| - - - - - - - - - - **helpers/**  // Custom: Directives, Filters, services, etc.  
| - - - - - - - - - - appAngular.js // AngularJs Routes  
| - - - - - - **stylesheets/**  
| - - - - - - - - - - styles.js  
| - - - - - - - - - - stylesLogin.js  
| - - - - - - **templates/**   
| - - - - - - - - - - login/  
| - - - - - - - - - - home.html  
| - **routes/**  
| - - - - - - error.ejs   
| - - - - - - index.ejs  // This Is The Layout file That Contains All The Linked Files
| - **views/**  
| - app.js

## Cookies
   Session Variables
   > id
   > username
   > rol

### Using Session Variables Scopes from the Views
   {{user.id}} - {{user.username}} - {{user.rol}}

