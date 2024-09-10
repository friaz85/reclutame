import { Component } from '@angular/core';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-homethree-banner',
  templateUrl: './homethree-banner.component.html',
  styleUrls: ['./homethree-banner.component.scss']
})
export class HomethreeBannerComponent {
  arrPais:any = [];
  arrCategorias:any = [];

  constructor(private api: ReclutameService) { }

  ngOnInit() {
    this.getPaises();
    this.getCategorias();
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
