import { Component } from '@angular/core';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-cd-resume',
  templateUrl: './cd-resume.component.html',
  styleUrls: ['./cd-resume.component.scss']
})
export class CdResumeComponent {
  arrTipoTrabajo:any = [];
  arrGenero:any = [];

  constructor(
    private api: ReclutameService
    ) {
    this.getTipoTrabajo();
    this.getGenero();
  }

  async getTipoTrabajo() {
    const cat = await this.api.getTipoTrabajo();
    this.arrTipoTrabajo = cat.items;
  }

  async getGenero() {
    const cat = await this.api.getGenero();
    this.arrGenero = cat.items;
  }
}
