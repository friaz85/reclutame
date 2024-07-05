import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-popular-jobs',
    templateUrl: './popular-jobs.component.html',
    styleUrls: ['./popular-jobs.component.scss']
})
export class PopularJobsComponent {

    constructor(
        public router: Router
    ) { }

}