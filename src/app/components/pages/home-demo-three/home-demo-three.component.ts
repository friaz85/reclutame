import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-home-demo-three',
    templateUrl: './home-demo-three.component.html',
    styleUrls: ['./home-demo-three.component.scss']
})
export class HomeDemoThreeComponent {

    title = 'Home Demo - 3 - Jove';

    constructor(
      private titleService:Title,
      private api: ReclutameService
      ) {}

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.getCategorias();
        this.postCrearVacante();
    }

    async getCategorias() {
      const cat = await this.api.getCategorias();
      console.log("Categorías: ", cat);
    }

    async postCrearVacante() {
      const vacante = await this.api.postCrearVacante("Hola");
      console.log("Vacante creada: ", vacante);
    }
}
