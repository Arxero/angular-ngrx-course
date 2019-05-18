import { Action } from "@ngrx/store";
import { Course } from "./model/course";

//action name | source of the action | event that was triggered
export enum CourseActionTypes {
    CourseRequested = '[View Course Page] Course Requested',
    CourseLoaded = '[Courses API] Course Loaded',
    AllCoursesRequested = '[Courses Home Page] All Courses Requested',
    AllCoursesLoaded = '[Courses API] All Courses Loaded',
}

//single course actions
export class CourseRequested implements Action {
    readonly type = CourseActionTypes.CourseRequested;
    constructor(public payload: { courseId: number }) { }
}

export class CourseLoaded implements Action {
    readonly type = CourseActionTypes.CourseLoaded;
    constructor(public payload: { course: Course }) { }
}

//all courses actions
export class AllCoursesRequested implements Action {
    readonly type = CourseActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
    readonly type = CourseActionTypes.AllCoursesLoaded;
    constructor(public payload: { courses: Course[] }) { }
}

export type CourseActions =
    CourseRequested |
    CourseLoaded |
    AllCoursesRequested |
    AllCoursesLoaded;