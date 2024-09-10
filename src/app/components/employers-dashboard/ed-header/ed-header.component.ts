import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
    selector: 'app-ed-header',
    templateUrl: './ed-header.component.html',
    styleUrls: ['./ed-header.component.scss']
})
export class EdHeaderComponent {

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
