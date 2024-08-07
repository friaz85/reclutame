import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReclutameService } from 'src/services/reclutame.service';
// @ts-ignore
// import Typewriter from 't-writer.js';

@Component({
  selector: 'app-ed-post-a-new-job',
  templateUrl: './ed-post-a-new-job.component.html',
  styleUrls: ['./ed-post-a-new-job.component.scss']
})
export class EdPostANewJobComponent {
  arrPais:any = [];
  arrCiudades:any = [];
  arrCategorias:any = [];
  arrSalarios:any = [];
  arrTipoTrabajo:any = [];
  arrNivelProfesional:any = [];
  arrExperiencias:any = [];
  arrGenero:any = [];
  arrIndustrias:any = [];
  arrGradoEscolar:any = [];

  frmJob: FormGroup | any;
  submitted = false;
  showSendIA = false;

  text: string = 'Este es un efecto de máquina de escribir.';
  displayedText: string = '';
  currentIndex: number = 0;

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
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
    this.bienveniaIA('Hola');
  }

  ngOnInit(): void {
    this.frmJob = this.formBuilder.group({
      p_titulo_vacante: ["", Validators.required],
      p_descripcion_vacante: ["", Validators.required],
      p_descripcion_vacante_send: ["", Validators.required],
      p_email: ["", Validators.required],
      p_id_categoria: ["", Validators.required],
      p_id_tipo_trabajo: ["", Validators.required],
      p_id_salario: ["", Validators.required],
      p_id_nivel_profesional: ["", Validators.required],
      p_id_experiencia: ["", Validators.required],
      p_id_genero: ["", Validators.required],
      p_id_industria: ["", Validators.required],
      p_id_grado_escolar: ["", Validators.required],
      p_fecha_limite_solicitud: ["", Validators.required],
      p_id_pais: ["", Validators.required],
      p_id_ciudad: ["", Validators.required],
      p_direccion: ["", Validators.required]
    });
  }

  get fCo() {
    return this.frmJob.controls;
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

  async postCrearVacante(element: any, txtJob: any) {
    this.spinner.show();
    element.textContent = 'Processing';
    element.disabled = true

    txtJob.disabled = true;

    const vacante = await this.api.postCrearVacante(this.frmJob.value.p_descripcion_vacante_send);
    console.log("Vacante creada: ", vacante);
    this.text = vacante.response;
    this.displayedText = '';
    this.currentIndex = 0;
    this.typeWriterEffect();
    element.textContent = 'Send';
    element.disabled = false
    this.spinner.hide();
  }

  async bienveniaIA(msg: string) {
    this.spinner.show();
    const ia = await this.api.postCrearVacante(msg);
    console.log("Bienvenida IA: ", ia);
    this.text = ia.response;
    this.typeWriterEffect();
    this.showSendIA = true;
    this.spinner.hide();
  }

  typeWriterEffect() {

    if (this.currentIndex < this.text.length) {
      this.displayedText += this.text.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.typeWriterEffect(), 10); // Velocidad del efecto
    }
  }

  registroVacante() {
    this.submitted = true;

    if (this.frmJob.invalid) {
      return;
    }

    console.log(this.frmJob.value);
  }

}
