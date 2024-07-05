import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {

    constructor(
        public router: Router
    ) { }

}