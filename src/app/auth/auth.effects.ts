import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of, Observable } from 'rxjs';


@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) { }

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.LoginAction),
        tap((action) => localStorage.setItem('user', JSON.stringify(action.payload.user)))
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.LogoutAction),
        tap(() => {
            localStorage.removeItem('user')
            this.router.navigateByUrl('/login')
        })
    );

    @Effect()
    init$ = defer((): Observable<Login | Logout> => {
        const userData = localStorage.getItem('user')

        if (userData) {
            //dispatching action to the store
            return of(new Login({user:JSON.parse(userData)}));
        } else {
            return of(new Logout());
        }
    });



}
