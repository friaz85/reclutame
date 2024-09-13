import { Component, Input, OnInit } from '@angular/core';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-modal-all-candidates',
  templateUrl: './modal-all-candidates.component.html',
  styleUrls: ['./modal-all-candidates.component.scss']
})
export class ModalAllCandidatesComponent implements OnInit {

  @Input() job: any;
  arrCandidates: any = [];
  arrEstatusPostulacion: any = [];
  candidate: any = [];

  constructor(
    private api: ReclutameService
  ) { }

  async ngOnInit() {

    console.log(this.job);
    const candidatos = await this.api.getCandidatosPorVacante(this.job.id_vacante);
    console.log(candidatos.p_result);
    this.arrCandidates = candidatos.p_result;

    const estaus = await this.api.getEstatusPostulacion();
    console.log(estaus);
    this.arrEstatusPostulacion = estaus.items;
  }

  async updateEstatusPostualacion (idEstatusPostulacion: any, idCandidato: any) {
    const resp = await this.api.updateEstatusPostulacion(idCandidato, this.job.id_vacante, idEstatusPostulacion);
    console.log(resp);
  }

}
