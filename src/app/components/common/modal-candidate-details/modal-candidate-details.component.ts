import { Component, Input, OnInit } from '@angular/core';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-modal-candidate-details',
  templateUrl: './modal-candidate-details.component.html',
  styleUrls: ['./modal-candidate-details.component.scss']
})
export class ModalCandidateDetailsComponent implements OnInit {

  @Input() aplicante: any;
  arrEducacion: any = [];
  arrExperiencia: any = [];

  constructor(
    private api: ReclutameService
  ) { }

  async ngOnInit() {
    console.log(this.aplicante);
    const edu = await this.api.getResumenEDU(this.aplicante.id_candidato);
    this.arrEducacion = edu.items;
    console.log(this.arrEducacion);

    const exp = await this.api.getResumenEXP(this.aplicante.id_candidato);
    this.arrExperiencia = exp.items;
    console.log(this.arrExperiencia);
  }

}
