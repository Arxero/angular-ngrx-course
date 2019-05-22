
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



# To Add Ngrx packages to a new project

    npm install @ngrx/store
    npm install @ngrx/effects
    npm install @ngrx/router-store
    npm install @ngrx/store-devtools
    npm install @ngrx/entity
    npm install @ngrx/schematics
    npm install --save-dev ngrx-store-freeze


# Simple tutorial on how to implement ngrx

1. Setup schematics -  **ng config cli.defaultCollection @ngrx/schematics**
2. Generate store **ng g store AppState --root --module app.module.ts**
3. Install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) for chrome
3. Setup store freeze in **reducers/index.ts** add **storeFreeze** like:
```javascript
import { storeFreeze } from 'ngrx-store-freeze';
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
```
4. Add EffectsModule in imports of app.module.ts
```javascript
import { EffectsModule } from '@ngrx/effects';
EffectsModule.forRoot([]),
```
5. Setup Time Travelling Debugger, in imports of app.module.ts add
```javascript
import {StoreRouterConnectingModule } from "@ngrx/router-store";
StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
```
6. [Create router CustomSerializer for the time traveling](https://github.com/Arxero/angular-ngrx-course/commit/0cfc65c97f57df82696cf0174e916bcd017b3caf)

7. Generate the first action file **ng g action auth(folder name)/Auth(action name)** and write appropiate classes for every each of the actions then export them as union types bellow

8. Generate reducer **ng g reducer  components/people --module app.module.ts** and add all needed code [Example](https://github.com/Arxero/angular-ngrx-course/commit/a721a780d78134834458228f8818dd1003e2a510)

9. [Creating](https://github.com/Arxero/angular-ngrx-course/blob/master/src/app/courses/course.selectors.ts) some needed selectors

10. Creating the effects **ng g effect components/people --module app.module.ts** - [example](https://github.com/Arxero/angular-ngrx-course/blob/master/src/app/courses/course.effects.ts)




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

Generate entity

    ng g entity --name Lesson --module courses/courses.module.ts

