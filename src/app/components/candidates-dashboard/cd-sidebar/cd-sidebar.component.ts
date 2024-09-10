import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
    selector: 'app-cd-sidebar',
    templateUrl: './cd-sidebar.component.html',
    styleUrls: ['./cd-sidebar.component.scss']
})
export class CdSidebarComponent {

    classApplied = false;

    constructor(
      public router: Router,
      private auth: AuthService,
    ) { }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    logout() {
      this.auth.logout();
    }

}
