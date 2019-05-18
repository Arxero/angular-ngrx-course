import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { CourseActionTypes, CourseRequested, CourseLoaded, AllCoursesRequested, AllCoursesLoaded } from "./course.actions";
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

    @Effect()
    loadAllCourses$ = this.actions$.pipe(
        ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
        mergeMap(action => this.coursesService.findAllCourses()),
        map(courses => new AllCoursesLoaded({ courses }))
    );


}