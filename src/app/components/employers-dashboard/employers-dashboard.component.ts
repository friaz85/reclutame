import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-employers-dashboard',
    templateUrl: './employers-dashboard.component.html',
    styleUrls: ['./employers-dashboard.component.scss']
})
export class EmployersDashboardComponent {

    title = 'Employers Dashboard - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}