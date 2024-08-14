import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-jobs-listing-page',
    templateUrl: './jobs-listing-page.component.html',
    styleUrls: ['./jobs-listing-page.component.scss']
})
export class JobsListingPageComponent {

    title = 'Jobs Listing';

    arrVacantes = [];
    arrPais = [];

    constructor(
      private titleService:Title,
      private api: ReclutameService) {
        this.getVacantes();
        this.getPaises();
      }

    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

    async getVacantes() {
        try {
          const vacantes = await this.api.getVacantes();
          console.log(vacantes);
          this.arrVacantes = vacantes.p_result;
        } catch (err) {
          console.error;
        }
    }

    async getPaises() {
      const pais = await this.api.getPais();
      this.arrPais = pais.items;
      console.log("Paises: ", this.arrPais);
    }

}
