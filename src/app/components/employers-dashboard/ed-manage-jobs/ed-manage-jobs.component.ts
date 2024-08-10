import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ed-manage-jobs',
  templateUrl: './ed-manage-jobs.component.html',
  styleUrls: ['./ed-manage-jobs.component.scss']
})
export class EdManageJobsComponent {
  arrVacantes = [];

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService
    ) {
      this.getVacatntesReclutador(this.auth.currentUserValue.p_id_reclutador);
  }

  async getVacatntesReclutador(idReclutador: any) {
    this.spinner.show();
    try{
      const vacantes = await this.api.getVacantesReclutador(idReclutador);
      console.log(vacantes);
      this.arrVacantes = vacantes.p_result;
    } catch(err){
      console.error;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
      });
    }
    this.spinner.hide();
  }
}
