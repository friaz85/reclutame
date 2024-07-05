import { Component } from '@angular/core';

@Component({
    selector: 'app-ed-sidebar',
    templateUrl: './ed-sidebar.component.html',
    styleUrls: ['./ed-sidebar.component.scss']
})
export class EdSidebarComponent {

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}