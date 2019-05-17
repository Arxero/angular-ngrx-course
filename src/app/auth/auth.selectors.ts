import { createSelector } from "@ngrx/store";

//getting the auth state from the store
export const selectAuthState = (state) => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    //projector function that getting all the input from all selectors above
    (auth) => auth.loggedIn
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
);