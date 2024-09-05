import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-ed-all-applicants',
  templateUrl: './ed-all-applicants.component.html',
  styleUrls: ['./ed-all-applicants.component.scss']
})
export class EdAllApplicantsComponent {
  arrAplicantes: any = [];

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private ref: ChangeDetectorRef
  ) {
    this.getAplicantes(this.auth.currentUserValue.p_id_reclutador);
  }

  async getAplicantes(idReclutador: any) {
    this.spinner.show();
    try {
      const aplicantes = await this.api.getAplicantes(idReclutador);
      console.log(aplicantes);
      this.arrAplicantes = aplicantes.p_result;
    } catch (err) {
      console.error;
    }
    this.spinner.hide();
  }

}
