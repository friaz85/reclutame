import { Component } from '@angular/core';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-ed-company-profile',
  templateUrl: './ed-company-profile.component.html',
  styleUrls: ['./ed-company-profile.component.scss']
})
export class EdCompanyProfileComponent {
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
