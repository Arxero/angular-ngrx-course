import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { CourseActionTypes, CourseRequested, CourseLoaded, AllCoursesRequested, AllCoursesLoaded, LessonsPageRequested, LessonsPageLoaded, LessonsPageCancelled } from "./course.actions";
import { mergeMap, map, withLatestFrom, filter, catchError } from "rxjs/operators";
import { CoursesService } from "./services/courses.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { allCoursesLoaded } from "./course.selectors";
import { of } from "rxjs";

@Injectable()
export class CourseEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private store: Store<AppState>) {

    }

    @Effect()
    loadCourses$ = this.actions$.pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
        map(course => new CourseLoaded({ course }))
    );

    @Effect()
    loadAllCourses$ = this.actions$.pipe(
        ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
        filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
        mergeMap(() => this.coursesService.findAllCourses()),
        map(courses => new AllCoursesLoaded({ courses }))
    );

    @Effect()
    loadLessonsPage$ = this.actions$.pipe(
        ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested),
        mergeMap(({ payload }) => this.coursesService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize)
            .pipe(
                catchError(err => {
                    console.log('error loading a lessons page ', err);
                    this.store.dispatch(new LessonsPageCancelled());
                    return of([])
                }),
            )
        ),
        map(lessons => new LessonsPageLoaded({ lessons })),
    );


}