import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';

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
      this.getVacatntes();
  }

  async getVacatntes() {
    this.spinner.show();
    const vacantes = await this.api.getVacantes();
    console.log(vacantes);
    this.arrVacantes = vacantes.items;
    this.spinner.hide();
  }
}
