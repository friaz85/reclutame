import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-jobs-listing-page',
    templateUrl: './jobs-listing-page.component.html',
    styleUrls: ['./jobs-listing-page.component.scss']
})
export class JobsListingPageComponent {

    title = 'Jobs Listing - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}