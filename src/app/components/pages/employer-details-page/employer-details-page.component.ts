import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-employer-details-page',
    templateUrl: './employer-details-page.component.html',
    styleUrls: ['./employer-details-page.component.scss']
})
export class EmployerDetailsPageComponent {

    title = 'Employer Details - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}