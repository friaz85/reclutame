import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-get-hired-by-top-companies',
    templateUrl: './get-hired-by-top-companies.component.html',
    styleUrls: ['./get-hired-by-top-companies.component.scss']
})
export class GetHiredByTopCompaniesComponent {

    constructor(
        public router: Router
    ) { }

}