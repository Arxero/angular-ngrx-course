import { Course } from "./model/course";
import { Lesson } from "./model/lesson";

export interface CoursesState {
    coursesEntities: { [key: number]: Course };
    coursesOrder: number[];
}

export interface LessonsState {
    lessonsEntities: { [key: number]: Lesson };
    lessonsOrder: number[];
}