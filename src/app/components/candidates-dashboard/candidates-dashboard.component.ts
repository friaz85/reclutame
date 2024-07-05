import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-candidates-dashboard',
    templateUrl: './candidates-dashboard.component.html',
    styleUrls: ['./candidates-dashboard.component.scss']
})
export class CandidatesDashboardComponent {

    title = 'Candidates Dashboard - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}