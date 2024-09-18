import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ed-add-new-employer',
  templateUrl: './ed-add-new-employer.component.html',
  styleUrls: ['./ed-add-new-employer.component.scss']
})
export class EdAddNewEmployerComponent implements OnInit {

  frmReclutador: FormGroup | any;
  submittedReclutador = false;
  checkTerminosReclutador = false;
  arrHijos: any = [];

  constructor(
    public router: Router,
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.getReclutadoresHijos();
  }

  ngOnInit(): void {
    this.frmReclutador = this.formBuilder.group({
      nombreAdmin: ["", Validators.required],
      apellidoAdmin: ["", Validators.required],
      emailAdmin: ["", Validators.required],
      telefonoAdmin: ["", Validators.required],
      passwordAdmin: ["", Validators.required],
    });
  }

  get fCo() {
    return this.frmReclutador.controls;
  }

  checkTyCReclutador(event: any) {
    this.checkTerminosReclutador = event.currentTarget.checked;
  }

  async registroReclutador() {

    console.log(this.frmReclutador.value);

    this.submittedReclutador = true;
    if (this.frmReclutador.invalid) {
      return;
    }
    this.spinner.show();
    try {
      let idEmpresa = this.auth.currentUserValue.p_id_empresa;
      console.log(this.auth.currentUserValue.p_id_empresa);
      const reg = await this.api.registroUsuario(this.frmReclutador.value.emailAdmin, this.frmReclutador.value.passwordAdmin, 2, "1234567890", idEmpresa);
      const regReclutador = await this.api.registroReclutador(this.frmReclutador.value.nombreAdmin, this.frmReclutador.value.apellidoAdmin, this.frmReclutador.value.emailAdmin, reg.p_id_usuario, idEmpresa, this.frmReclutador.value.telefonoAdmin);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Successful registration.'
      })
      this.spinner.hide();
      // Redirect to dashboard
      // this.router.navigate(['/dashboard']);

    } catch (error: any) {
      console.log('Error Status: ', error.status);
      this.spinner.hide();
    }
  }

  async getReclutadoresHijos(){
    const reg = await this.api.getReclutadoresHijos(this.auth.currentUserValue.p_id_empresa);
    console.log(reg.p_result);
    this.arrHijos = reg.p_result;
  }

}
