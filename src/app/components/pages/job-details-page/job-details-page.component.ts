import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-job-details-page',
    templateUrl: './job-details-page.component.html',
    styleUrls: ['./job-details-page.component.scss']
})
export class JobDetailsPageComponent {

    title = 'Job Details';
    arrVacante:any  = [];

    idVacante = 0;

    constructor(
      private titleService:Title,
      private route: ActivatedRoute,
      private api: ReclutameService
      ) {
      this.route.queryParams.subscribe((params:any) => {
        this.idVacante = params['jobId'];
        this.getVacante(this.idVacante);
        });
    }

    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

    async getVacante(idVacante: any) {
      console.log("ID Vacante: ", idVacante);
      this.arrVacante = await this.api.getVacante(idVacante);
      console.log("Vacante: ", this.arrVacante);
    }

}
