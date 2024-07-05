import { Component } from '@angular/core';

@Component({
    selector: 'app-cd-sidebar',
    templateUrl: './cd-sidebar.component.html',
    styleUrls: ['./cd-sidebar.component.scss']
})
export class CdSidebarComponent {

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}