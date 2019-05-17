
## Angular Ngrx Course

This repository contains the step by step code of the [Angular Ngrx Course](https://angular-university.io/course/angular-ngrx-course).

# To Run the Development Backend Server

We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)


# Commands Used in the Terminal (in order)
To set up schematics in the cli

    ng config cli.defaultCollection @ngrx/schematics

Generate store

    ng g store AppState --root --module app.module.ts
    
Generate action file with default actions

    ng g action auth/Auth

Generate reducer without folder in auth module

    ng g reducer Auth --flat=false --module auth/auth.module.ts

Generate ngrx effects file

    ng g effect auth/Auth --module auth/auth.module

