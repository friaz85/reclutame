import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-download-app',
    templateUrl: './download-app.component.html',
    styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent {

    constructor(
        public router: Router
    ) { }

}