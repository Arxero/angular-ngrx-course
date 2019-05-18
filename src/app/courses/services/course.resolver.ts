import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { selectCourseById } from "../course.selectors";
import { CourseRequested } from "../course.actions";
import { tap, filter, first } from "rxjs/operators";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(
        private coursesService: CoursesService,
        private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        let courseId = route.params['id'];
        //return this.coursesService.findCourseById(courseId);

        //we are quering/asking the store if there is such course in there
        return this.store.pipe(
            select(selectCourseById(courseId)),

            //handling when course is not present in the store
            tap(course => {
                if (!course) {
                    this.store.dispatch(new CourseRequested({ courseId }))
                }
            }),
            //what happens if the course is not yet avaiable to the store
            filter(course => !!course),
            first()
        )
    }

}

