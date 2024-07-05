import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-how-jove-works',
    templateUrl: './how-jove-works.component.html',
    styleUrls: ['./how-jove-works.component.scss']
})
export class HowJoveWorksComponent {

    constructor(
        public router: Router
    ) { }

}