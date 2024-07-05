import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-talented-experts',
    templateUrl: './talented-experts.component.html',
    styleUrls: ['./talented-experts.component.scss']
})
export class TalentedExpertsComponent {

    constructor(
        public router: Router
    ) { }

}