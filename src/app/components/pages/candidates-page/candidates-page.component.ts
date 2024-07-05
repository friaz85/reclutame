import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-candidates-page',
    templateUrl: './candidates-page.component.html',
    styleUrls: ['./candidates-page.component.scss']
})
export class CandidatesPageComponent {

    title = 'Candidates - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}