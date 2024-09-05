import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-job-details-page',
    templateUrl: './job-details-page.component.html',
    styleUrls: ['./job-details-page.component.scss']
})
export class JobDetailsPageComponent {

    title = 'Job Details';
    arrVacante:any  = [];

    idVacante = 0;
    idCandidato = 0;

    arrPais: any = [];
    arrCiudades: any = [];
    frmCandidato: FormGroup | any;
    frmCompany: FormGroup | any;
    frmLogin: FormGroup | any;
    submittedCandidato = false;
    submittedCompany = false;
    submittedLogin = false;
    checkTerminosCandidato = false;
    checkTerminosCcompany = false;

    constructor(
      private titleService:Title,
      private route: ActivatedRoute,
      private api: ReclutameService,
      private apiLogin: AuthService,
      private spinner: NgxSpinnerService,
      private formBuilder: FormBuilder
      ) {
      this.route.queryParams.subscribe((params:any) => {
        this.idVacante = params['jobId'];
        this.getVacante(this.idVacante);
        });
    }

    ngOnInit() {
        this.titleService.setTitle(this.title);

        this.frmCandidato = this.formBuilder.group({
          nombreCandidato: ["", Validators.required],
          apellidoCandidato: ["", Validators.required],
          emailCandidato: ["", Validators.required],
          telefonoCandidato: ["", Validators.required],
          passwordCandidato: ["", Validators.required],
        });

        this.frmCompany = this.formBuilder.group({
          nombreAdmin: ["", Validators.required],
          apellidoAdmin: ["", Validators.required],
          emailAdmin: ["", Validators.required],
          telefonoAdmin: ["", Validators.required],
          passwordAdmin: ["", Validators.required],
          nombreCompany: ["", Validators.required],
          paisCompany: ["", Validators.required],
          ciudadCompany: ["", Validators.required],
        });

        this.frmLogin = this.formBuilder.group({
          user: ["", Validators.required],
          pwd: ["", Validators.required],
        });

    }

    get f() {
      return this.frmCandidato.controls;
    }

    get fCo() {
      return this.frmCompany.controls;
    }

    get fl() {
      return this.frmLogin.controls;
    }

    classApplied = false;
    toggleClass() {
      this.classApplied = !this.classApplied;
    }

    // Tabs 1
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
      event.preventDefault();
      this.currentTab = tab;
    }

    // Tabs 2
    currentInnerTab = 'innerTab1';
    switchInnerTab(event: MouseEvent, tab: string) {
      event.preventDefault();
      this.currentInnerTab = tab;
    }

    // Modal Popup
    isOpen = false;
    openPopup(): void {
      this.isOpen = true;
    }
    closePopup(): void {
      this.isOpen = false;
    }

    async getPaises() {
      const pais = await this.api.getPais();
      this.arrPais = pais.items;
    }

    async getCiudades(id: number) {
      const ciudad = await this.api.getCiudades(id);
      this.arrCiudades = ciudad.items;
    }

    async registroCandidato() {
      console.log(this.frmCandidato.value);
      console.log(this.frmCandidato.value.nombreCandidato);

      console.log(this.f);

      this.submittedCandidato = true;
      if (this.frmCandidato.invalid) {
        return;
      }
      this.spinner.show();
      try {
        const reg = await this.api.registroUsuario(this.f.emailCandidato.value, this.f.passwordCandidato.value, 3, "1234567890", 0);
        console.log(reg);
        if (!reg.p_error_message) {
          const regCandidato = await this.api.registroCandidato(this.f.nombreCandidato.value, this.f.apellidoCandidato.value, this.f.emailCandidato.value, this.f.telefonoCandidato.value, reg.p_id_usuario);
          console.log(regCandidato);
          if (!regCandidato.p_error_message) {
            // Login
            const login = await (await this.apiLogin.login(this.f.emailCandidato.value, this.f.passwordCandidato.value)).subscribe({
              next: (data) => {
                this.idCandidato = data.p_id_candidato;
                this.spinner.hide();
                this.aplicarVacante();
              },
              error: (error) => {
                console.error('There was an error!', error);
                this.spinner.hide();
              },
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al registrar el candidato. ' + regCandidato.p_error_message
            });
            this.spinner.hide();
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el usuario. ' + reg.p_error_message
          });
          this.spinner.hide();
        }

      } catch (error: any) {
        console.log('Error Status: ', error.status);
        this.spinner.hide();
      }
    }

    checkTyCCandidato(event: any) {
      this.checkTerminosCandidato = event.currentTarget.checked;
    }

    checkTyCCompany(event: any) {
      this.checkTerminosCcompany = event.currentTarget.checked;
    }

    async login() {
      console.log('login');
      this.submittedLogin = true;
      if (this.frmLogin.invalid) {
        return;
      }
      this.spinner.show();
      try {
        const login = await (await this.apiLogin.login(this.fl.user.value, this.fl.pwd.value)).subscribe({
          next: (data) => {
            console.log(data);
            this.idCandidato = data.p_id_candidato;
            this.spinner.hide();
            this.aplicarVacante();
          },
          error: (error) => {
            this.spinner.hide();
            console.error('There was an error!', error);
          },
        });
      } catch (error: any) {
        this.spinner.hide();
        console.log('Error Status: ', error.status);
      }
    }


    async getVacante(idVacante: any) {
      console.log("ID Vacante: ", idVacante);
      this.arrVacante = await this.api.getVacante(idVacante);
      console.log("Vacante: ", this.arrVacante);
    }


    async aplicarVacante() {

      let user:any = JSON.parse(localStorage.getItem('User') || '{}');

      if (!user.p_id_candidato) {
        this.openPopup();
        // idUsuario = parseInt(localStorage.getItem('idUsuario'));
      } else {
        this.spinner.show();
        this.idCandidato = user.p_id_candidato;
        let res = await this.api.registroPostulacion(this.idCandidato, this.idVacante);
        console.log("Respuesta: ", res);
        if (!res.p_error_message) {
          this.spinner.hide();
          this.closePopup();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Aplicación a la vacante realizada con éxito.'
          });
        } else {
          this.spinner.hide();
          this.closePopup();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al aplicar a la vacante. ' + res.p_error_message
          });
        }
      }

    }
}
