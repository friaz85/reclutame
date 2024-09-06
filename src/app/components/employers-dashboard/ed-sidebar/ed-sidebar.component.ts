import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
    selector: 'app-ed-sidebar',
    templateUrl: './ed-sidebar.component.html',
    styleUrls: ['./ed-sidebar.component.scss']
})
export class EdSidebarComponent {

    classApplied = false;
    constructor(
      private auth: AuthService
    ) { }
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    logout() {
      this.auth.logout();
    }
}
