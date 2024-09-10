import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
    selector: 'app-jobs-sidebar',
    templateUrl: './jobs-sidebar.component.html',
    styleUrls: ['./jobs-sidebar.component.scss']
})
export class JobsSidebarComponent {
  arrSalarios:any = [];
  arrTipoTrabajo:any = [];
  arrNivelProfesional:any = [];
  arrExperiencias:any = [];
  arrGenero:any = [];
  arrGradoEscolar:any = [];
    constructor(
        public router: Router,
        private api: ReclutameService
    ) {
      this.getTipoTrabajo();
      this.getSalario();
      this.getNivelProfesional();
      this.getExperiencia();
      this.getGenero();
      this.getGradoEscolar();
    }

    async getSalario() {
      const salario = await this.api.getSalario();
      this.arrSalarios = salario.items;
      // Sort
      this.arrSalarios.sort((a: any, b: any) => {
        if (a.id_salario < b.id_salario) {
          return -1;
        }
        if (a.id_salario > b.id_salario) {
          return 1;
        }
        return 0;
      });
    }

    async getTipoTrabajo() {
      const cat = await this.api.getTipoTrabajo();
      this.arrTipoTrabajo = cat.items;
    }

    async getNivelProfesional() {
      const cat = await this.api.getNivelProfesional();
      this.arrNivelProfesional = cat.items;
      console.log(this.arrNivelProfesional);
    }

    async getExperiencia() {
      const cat = await this.api.getExperiencia();
      this.arrExperiencias = cat.items;
    }

    async getGenero() {
      const cat = await this.api.getGenero();
      this.arrGenero = cat.items;
    }

    async getGradoEscolar() {
      const cat = await this.api.getGradoEscolar();
      this.arrGradoEscolar = cat.items;
      console.log(this.arrGradoEscolar);
    }
}
