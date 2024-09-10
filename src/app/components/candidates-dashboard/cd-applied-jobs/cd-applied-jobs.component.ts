import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-cd-applied-jobs',
  templateUrl: './cd-applied-jobs.component.html',
  styleUrls: ['./cd-applied-jobs.component.scss']
})
export class CdAppliedJobsComponent {
  arrVacantes: any = [];

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private ref: ChangeDetectorRef
  ) {
    this.geVacantes(this.auth.currentUserValue.p_id_candidato);
  }

  async geVacantes(idCandidado: any) {
    this.spinner.show();
    try {
      const vacantes = await this.api.getVacantesAplicados(idCandidado);
      console.log(vacantes);
      this.arrVacantes = vacantes.p_result;
    } catch (err) {
      console.error;
    }
    this.spinner.hide();
  }
}
