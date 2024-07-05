import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-jobs-grid-page',
    templateUrl: './jobs-grid-page.component.html',
    styleUrls: ['./jobs-grid-page.component.scss']
})
export class JobsGridPageComponent {

    title = 'Jobs Grid - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}