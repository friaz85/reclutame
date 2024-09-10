import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-employers-page',
    templateUrl: './employers-page.component.html',
    styleUrls: ['./employers-page.component.scss']
})
export class EmployersPageComponent {
  arrPais:any = [];
  arrCategorias:any = [];
    title = 'Employers - Reclútame';

    constructor(
      private titleService:Title,
      private api: ReclutameService) {
      this.getPaises();
      this.getCategorias();
    }

    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

    async getPaises() {
      const pais = await this.api.getPais();
      this.arrPais = pais.items;
      console.log("Paises: ", this.arrPais);
    }

    async getCategorias() {
      const cat = await this.api.getCategorias();
      this.arrCategorias = cat.items;
      console.log("Categorías: ", this.arrCategorias);
    }

}
