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

  arrAplicantes: any = [];
  aplicante: any  = {};

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

  // Modal Popup
  isOpen = false;
  openPopup(arr: any): void {

    console.log(arr);
    // Add item "email_candidato" to the array aplicante
    arr.email_candidato = arr.email;
    arr.nombre_candidato = arr.nombre;
    arr.apellido_candidato = arr.apellido;
    arr.pais = arr.nombre_pais;
    arr.ciudad = arr.nombre_ciudad;
    arr

    this.isOpen = true;
    this.aplicante  = arr;
  }
  closePopup(): void {
    this.isOpen = false;
  }

}
