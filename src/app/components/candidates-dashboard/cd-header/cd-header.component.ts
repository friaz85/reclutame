import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
    selector: 'app-cd-header',
    templateUrl: './cd-header.component.html',
    styleUrls: ['./cd-header.component.scss']
})
export class CdHeaderComponent {

    constructor(
      private auth: AuthService
    ) { }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

    logout() {
      this.auth.logout();
    }

}
