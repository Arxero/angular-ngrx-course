import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./course.reducers";
import * as fromCourse from './course.reducers';
import * as fromLesson from './lessons.reducers';
import { PageQuery } from "./course.actions";
import { LessonsState } from "./lessons.reducers";

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');
export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');


export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
    //selecting the comlete courses state
    selectCoursesState,
    //projector function
    fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);

export const allCoursesLoaded = createSelector(
    selectCoursesState,
    coursesState => coursesState.allCoursesLoaded
);

//lessons selector
export const selectAllLessons = createSelector(
    //selecting the comlete lessons state
    selectLessonsState,
    //projector function
    fromLesson.selectAll
);

export const selectLessonsPage = (courseId: number, page: PageQuery) => createSelector(
    selectAllLessons,
    allLessons => {
        const start = page.pageIndex * page.pageSize;
        const end = start + page.pageSize
        return allLessons
            .filter(lesson => lesson.courseId == courseId)
            .slice(start, end);
    }

);

