import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-employers-page',
    templateUrl: './employers-page.component.html',
    styleUrls: ['./employers-page.component.scss']
})
export class EmployersPageComponent {

    title = 'Employers - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}