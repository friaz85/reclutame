import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-job-detail',
  templateUrl: './modal-job-detail.component.html',
  styleUrls: ['./modal-job-detail.component.scss']
})
export class ModalJobDetailComponent implements OnInit {

  @Input() job: any;
  @Input() company: any;
  @Input() origen: any;
  @Input() email: any;


  constructor(
    public auth: AuthService,
    private spinner: NgxSpinnerService,
    private api: ReclutameService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    console.log(this.job);
    console.log(this.company);
  }



  async aplicarVacante() {

    let user:any = JSON.parse(localStorage.getItem('User') || '{}');

    if (this.auth.currentUserValue.p_bandera == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        html: "<p>No puedes aplicar a la vacante debido a que tu perfil está incompleto.</p>",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: `Ok`,
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // this.aplicarVacante();

          if (user.p_id_rol == 3) {
            // Redirect to dashboard candidate
            this.spinner.hide();
            this.router.navigate(['/candidates-dashboard']);
          }
        }
      });
    } else if (this.auth.currentUserValue.p_bandera == 1) {

      this.spinner.show();
      let res = await this.api.registroPostulacion(user.p_id_candidato, this.job.id_vacante);
      console.log("Respuesta: ", res);
      if (!res.p_error_message) {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Aplicación a la vacante realizada con éxito.'
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al aplicar a la vacante. ' + res.p_error_message
        });
      }
    }

  }

  getMapURL() {
    return encodeURI("https://maps.google.com/maps?q=" + this.job.City + "&output=embed");
  }

  async registroVacante() {

    this.spinner.show();
    const reg = await this.api.registroVacante(
      this.job['vacancy_name'],
      this.job['technical_requirements'],
      this.email,
      this.job['Specialisms'],
      this.job['Job type'],
      this.job['Offered salary (monthly)'],
      this.job['Career level'],
      this.job['Experience'],
      this.job['Gender'],
      this.job['Industry'],
      this.job['Qualification'],
      this.job['Application deadline date'],
      this.job['Country'],
      this.job['City'],
      this.job['City'] + ', ' + this.job['Country'],
      this.auth.currentUserValue.p_id_empresa,
      this.auth.currentUserValue.p_id_reclutador
      );

    console.log(reg);
    this.spinner.hide();
    if (!reg.p_error_message) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Vacante registrada con éxito.'
      });
      // reiniciar formulario
      this.spinner.hide();
      // this.frmJob.reset();
      // reload page
      window.location.reload();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar la vacante. ' + reg.p_error_message
      });
      this.spinner.hide();
    }
  }

}
