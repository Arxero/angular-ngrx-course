import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { CourseActionTypes, CourseRequested, CourseLoaded } from "./course.actions";
import { mergeMap, map } from "rxjs/operators";
import { CoursesService } from "./services/courses.service";

@Injectable()
export class CourseEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService) {

    }

    @Effect()
    loadCourses$ = this.actions$.pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
        map(course => new CourseLoaded({ course }))

    );



}