import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AllCoursesRequested } from '../course.actions';
import { selectAllCourses, selectBeginnerCourses, selectAdvancedCourses, selectPromoTotal } from '../course.selectors';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    promoTotal$: Observable<number>;
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new AllCoursesRequested());
        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
        this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
    }
}
