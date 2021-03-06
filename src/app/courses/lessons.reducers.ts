import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Lesson } from "./model/lesson";
import { CourseActions, LessonsPageRequested, CourseActionTypes } from "./course.actions";

export interface LessonsState extends EntityState<Lesson> {
    loading: boolean;
}



function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
    const compare = l1.courseId - l2.courseId;
    if (compare != 0) {
        return compare;
    } else {
        return l1.seqNo - l2.seqNo;
    }
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
    sortComparer: sortByCourseAndSeqNo
});

export const initialLessonsState: LessonsState = adapter.getInitialState({
    loading: false
});

export function lessonsReducer(state = initialLessonsState, action: CourseActions): LessonsState {
    switch (action.type) {
        case CourseActionTypes.LessonsPageRequested:
            //manually creating coppy of the existent state and setting loading to true
            return {
                ...state,
                loading: true
            }
        case CourseActionTypes.LessonsPageLoaded:
            return adapter.addMany(action.payload.lessons, { ...state, loading: false });

        case CourseActionTypes.LessonsPageCancelled:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}


export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();