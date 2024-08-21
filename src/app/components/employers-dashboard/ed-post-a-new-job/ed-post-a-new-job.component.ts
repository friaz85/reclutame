import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
// @ts-ignore
// import Typewriter from 't-writer.js';

@Component({
  selector: 'app-ed-post-a-new-job',
  templateUrl: './ed-post-a-new-job.component.html',
  styleUrls: ['./ed-post-a-new-job.component.scss']
})
export class EdPostANewJobComponent {
  arrPais: any = [];
  arrCiudades: any = [];
  arrCategorias: any = [];
  arrSalarios: any = [];
  arrTipoTrabajo: any = [];
  arrNivelProfesional: any = [];
  arrExperiencias: any = [];
  arrGenero: any = [];
  arrIndustrias: any = [];
  arrGradoEscolar: any = [];

  frmJob: FormGroup | any;
  submitted = false;
  showSendIA = false;

  text: string = 'Este es un efecto de máquina de escribir.';
  displayedText: string = '';
  currentIndex: number = 0;
  user = '';
  reclutador:any = [];
  arrChat: any = [];
  lastMsg = '';
  txtIA = '';
  showError = false;
  vacanteCompletaIA= false;

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {
    this.getPaises();
    this.getCategorias();
    this.getSalario();
    this.getTipoTrabajo();
    this.getNivelProfesional();
    this.getExperiencia();
    this.getGenero();
    this.getIndustria();
    this.getGradoEscolar();
    this.getReclutador();
    this.bienveniaIA('Hola');
    this.user = this.auth.currentUserValue.p_nombre;
  }

  ngOnInit(): void {
    this.frmJob = this.formBuilder.group({
      p_titulo_vacante: ["", Validators.required],
      p_descripcion_vacante: [""],
      p_descripcion_vacante_send: [""],
      // p_email: ["", Validators.required],
      // p_id_categoria: ["", Validators.required],
      // p_id_tipo_trabajo: ["", Validators.required],
      // p_id_salario: ["", Validators.required],
      // p_id_nivel_profesional: ["", Validators.required],
      // p_id_experiencia: ["", Validators.required],
      // p_id_genero: ["", Validators.required],
      // p_id_industria: ["", Validators.required],
      // p_id_grado_escolar: ["", Validators.required],
      // p_fecha_limite_solicitud: ["", Validators.required],
      // p_id_pais: ["", Validators.required],
      // p_id_ciudad: ["", Validators.required],
      // p_direccion: ["", Validators.required]
    });
  }

  get fCo() {
    return this.frmJob.controls;
  }

  // Modal Popup
  isOpen = false;
  openPopup(): void {
    this.isOpen = true;
  }
  closePopup(): void {
    this.isOpen = false;
  }

  async getReclutador() {
    this.spinner.show();
    try {
      const rec = await this.api.getReclutador(this.auth.currentUserValue.p_id_reclutador);
      console.log(rec);
      this.reclutador = rec.items[0];
    } catch (error) {
      console.log(error);
    }
    this.spinner.hide();
  }

  async getPaises() {
    const pais = await this.api.getPais();
    this.arrPais = pais.items;
  }

  async getCiudades(id: number) {
    const ciudad = await this.api.getCiudades(id);
    this.arrCiudades = ciudad.items;
  }

  async getCategorias() {
    const cat = await this.api.getCategorias();
    this.arrCategorias = cat.items;
  }

  async getSalario() {
    const salario = await this.api.getSalario();
    this.arrSalarios = salario.items;
    // Sort
    this.arrSalarios.sort((a: any, b: any) => {
      if (a.id_salario < b.id_salario) {
        return -1;
      }
      if (a.id_salario > b.id_salario) {
        return 1;
      }
      return 0;
    });
  }

  async getTipoTrabajo() {
    const cat = await this.api.getTipoTrabajo();
    this.arrTipoTrabajo = cat.items;
  }

  async getNivelProfesional() {
    const cat = await this.api.getNivelProfesional();
    this.arrNivelProfesional = cat.items;
    console.log(this.arrNivelProfesional);
  }

  async getExperiencia() {
    const cat = await this.api.getExperiencia();
    this.arrExperiencias = cat.items;
  }

  async getGenero() {
    const cat = await this.api.getGenero();
    this.arrGenero = cat.items;
  }

  async getIndustria() {
    const cat = await this.api.getIndustria();
    this.arrIndustrias = cat.items;
  }

  async getGradoEscolar() {
    const cat = await this.api.getGradoEscolar();
    this.arrGradoEscolar = cat.items;
    console.log(this.arrGradoEscolar);
  }

  async postCrearVacante() {

    this.showError = false;

    if (this.txtIA == '') {
      this.showError = true;
      return;
    }


    this.spinner.show();
    // element.textContent = 'Processing';
    // element.disabled = true
    this.arrChat.push({
      p_mensaje: this.txtIA,
      p_tipo: 'user',
      p_hora_min: moment(new Date(), "HH:mm").format("hh:mm A")
    });
    this.txtIA = '';
    const vacante = await this.api.postCrearVacante(this.txtIA, this.lastMsg);
    console.log("Vacante creada: ", vacante);
    if (vacante.response_type == 'text' && vacante.status == 'success') {
      //  Reemplazar saltos de líenas por <br>
      this.lastMsg = vacante.response;
      this.arrChat.push(
        {
          p_mensaje: vacante.response.replace(/(?:\r\n|\r|\n)/g, '<br>'),
          p_tipo: 'ia',
          p_hora_min: moment(new Date(), "HH:mm").format("hh:mm A")
        }
      );
    } else if (vacante.response_type == 'json' && vacante.status == 'success') {
      this.vacanteCompletaIA = true;
    }
    this.text = vacante.response;

    this.displayedText = '';
    this.currentIndex = 0;
    // this.typeWriterEffect();
    // element.textContent = 'Send';
    // element.disabled = false
    // txtJob.scrollTop = txtJob.scrollHeight;
    this.spinner.hide();
    // this.frmJob.setValue({
    //   p_descripcion_vacante_send: ''
    // });
  }

  async bienveniaIA(msg: string) {
    this.spinner.show();
    const ia = await this.api.postCrearVacante(msg, '');
    console.log("Bienvenida IA: ", ia);
    this.text = ia.response;
    this.arrChat.push(
      { p_mensaje: ia.response,
        p_tipo: 'ia',
        p_hora_min: moment(new Date(), "HH:mm").format("hh:mm A")
      }
      );
    console.log(this.arrChat);
    this.typeWriterEffect();
    this.showSendIA = true;
    this.spinner.hide();
  }

  typeWriterEffect() {
    let textarea = document.getElementById('txtJob') as HTMLUListElement;

    if (this.currentIndex < this.text.length) {
      this.displayedText += this.text.charAt(this.currentIndex);
      this.currentIndex++;
      // textarea.scrollTop = textarea.scrollHeight;
      setTimeout(() => this.typeWriterEffect(), 10); // Velocidad del efecto
    }
  }

  async registroVacante(descripcion: any) {

    this.submitted = true;
    console.log(this.frmJob);
    if (this.frmJob.invalid) {
      return;
    }
    this.spinner.show();
    const reg = await this.api.registroVacante(this.frmJob.value.p_titulo_vacante, descripcion.value, "test@test.com", 1, 1, 1, 1, 1, 1, 1, 1, "01-01-2025", 1, 1, "Calle", this.auth.currentUserValue.p_id_empresa, this.auth.currentUserValue.p_id_reclutador);
    if (!reg.p_error_message) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Vacante registrada con éxito.'
      });
      // reiniciar formulario
      this.spinner.hide();
      this.frmJob.reset();
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
