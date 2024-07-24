import { Component } from '@angular/core';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-cd-profile',
  templateUrl: './cd-profile.component.html',
  styleUrls: ['./cd-profile.component.scss']
})
export class CdProfileComponent {
  arrPais:any = [];
  arrCiudades:any = [];

  constructor(
    private api: ReclutameService
    ) {
      this.getPaises();
    }

    async getPaises() {
      const pais = await this.api.getPais();
      this.arrPais = pais.items;
    }

    async getCiudades(id: number) {
      const ciudad = await this.api.getCiudades(id);
      this.arrCiudades = ciudad.items;
    }

}
