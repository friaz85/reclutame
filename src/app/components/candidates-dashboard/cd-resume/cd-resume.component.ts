import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/auth.service';
import { ReclutameService } from 'src/services/reclutame.service';

@Component({
  selector: 'app-cd-resume',
  templateUrl: './cd-resume.component.html',
  styleUrls: ['./cd-resume.component.scss']
})
export class CdResumeComponent {
  arrTipoTrabajo:any = [];
  arrGenero:any = [];
  arrEstudios: any = [];
  arrExperiencias: any = [];
  arrPais = [];
  arrGradoEscolar:any = [];

  frmCareer: FormGroup | any;
  submittedCareer = false;

  frmEducation: FormGroup | any;
  submittedEducation = false;

  frmExperience: FormGroup | any;
  submittedExperience = false;

  p_id_resumen_carrera = 0;
  p_id_resumen_educacion = 0;
  p_id_resumen_experience = 0;

  constructor(
    private api: ReclutameService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService
    ) {
    this.getTipoTrabajo();
    this.getGenero();
    this.getPais();
    this.getGradoEscolar();
    this.getDatos();
  }

  ngOnInit(): void {
    this.frmCareer = this.formBuilder.group({
      objetivo: ["", Validators.required],
      salarioActual: ["", Validators.required],
      salarioEsperado: ["", Validators.required],
      tipo: ["", Validators.required],
    });

    this.frmEducation = this.formBuilder.group({
      grado: ["", Validators.required],
      instituto: ["", Validators.required],
      duracion: ["", Validators.required],
    });

    this.frmExperience = this.formBuilder.group({
      empresa: ["", Validators.required],
      giro: ["", Validators.required],
      responsabilidades: ["", Validators.required],
      periodo: ["", Validators.required],
    });
  }

  get f() {
    return this.frmCareer.controls;
  }

  get fe() {
    return this.frmEducation.controls;
  }

  get fex() {
    return this.frmExperience.controls;
  }

  async getTipoTrabajo() {
    const cat = await this.api.getTipoTrabajo();
    this.arrTipoTrabajo = cat.items;
  }

  async getGenero() {
    const cat = await this.api.getGenero();
    this.arrGenero = cat.items;
  }

  async getPais() {
    const pais = await this.api.getPais();
      this.arrPais = pais.items;
  }

  async getGradoEscolar() {
    const cat = await this.api.getGradoEscolar();
    this.arrGradoEscolar = cat.items;
    console.log(this.arrGradoEscolar);
  }

  async getDatos() {
    // Datos Career
    const cs = await this.api.getResumenCS(this.auth.currentUserValue.p_id_candidato);
    console.log("CS", cs);
    if (cs.items.length > 0) {
      this.p_id_resumen_carrera = cs.items[0].id_resumen_carrera;
      this.frmCareer.patchValue({
        objetivo: cs.items[0].objetivo,
        salarioActual: cs.items[0].salario_actual,
        salarioEsperado: cs.items[0].sueldo_esperado,
        tipo: cs.items[0].id_tipo_trabajo
      });
    }

    // Datos Education
    const edu = await this.api.getResumenEDU(this.auth.currentUserValue.p_id_candidato);
    console.log("EDU", edu);
    if (edu.items.length > 0) {
      // this.p_id_resumen_educacion = edu.items.length;
      edu.items.forEach((element: any) => {
        this.arrEstudios.push({
          grado: this.arrGradoEscolar.find((x: any) => x.id_grado_escolar == element.id_grado_escolar).descripcion,
          instituto: element.nombre_instituto,
          duracion: element.duracion,
          id_resumen_educacion: element.id_resumen_educacion,
          idGrado: element.id_grado_escolar
        });
      });
    }

    // Datos Experience
    const exp = await this.api.getResumenEXP(this.auth.currentUserValue.p_id_candidato);
    console.log("EXP", exp);
    if (exp.items.length > 0) {
      exp.items.forEach((element: any) => {
        this.arrExperiencias.push({
          empresa: element.nombre_empresa,
          giro: element.giro_empresa,
          responsabilidades: element.responsabilidades,
          periodo: element.periodo_empleo,
          id_resumen_experiencia: element.id_resumen_experiencia
        });
      });
    }
  }

  async saveCareer() {
    this.submittedCareer = true;
    if (this.frmCareer.invalid) {
      return;
    }
    this.spinner.show();
    // Registro
    if (this.p_id_resumen_carrera == 0) {
      let Cs = await this.api.registroResumenCS(this.frmCareer.value.objetivo, this.frmCareer.value.salarioActual,
        this.frmCareer.value.salarioEsperado, this.frmCareer.value.tipo, this.auth.currentUserValue.p_id_candidato);
        console.log("Cs", Cs);
      this.p_id_resumen_carrera = Cs.p_id_resumen_carrera;
      // reset form
      this.frmCareer.reset();
    } else {
      // Actualizo
      let Cs = await this.api.updateResumenCS(this.frmCareer.value.objetivo, this.frmCareer.value.salarioActual,
        this.frmCareer.value.salarioEsperado, this.frmCareer.value.tipo, this.auth.currentUserValue.p_id_candidato, this.p_id_resumen_carrera);
        // this.frmCareer.reset();
    }
    this.spinner.hide();
  }

  async saveEducation() {
    this.submittedEducation = true;
    if (this.frmEducation.invalid) {
      return;
    }
    this.spinner.show();
    // Registro

    if (this.p_id_resumen_educacion == 0) {
      // Guardo
      let edu = await this.api.registroResumenEDU(this.frmEducation.value.grado, this.frmEducation.value.instituto,
        this.frmEducation.value.duracion, this.auth.currentUserValue.p_id_candidato);
        console.log("EDU", edu);
      this.p_id_resumen_educacion = edu.p_id_resumen_educacion;
      // reset form

      this.spinner.hide();
      this.arrEstudios.push({
        grado: await this.arrGradoEscolar.find((x: any) => x.id_grado_escolar == this.frmEducation.value.grado).descripcion,
        instituto: this.frmEducation.value.instituto,
        duracion: this.frmEducation.value.duracion,
        id_resumen_educacion: this.p_id_resumen_educacion
      });
      this.frmEducation.reset();
    } else {
      // Actualizo
      let edu = await this.api.updateResumenEDU(this.frmEducation.value.grado, this.frmEducation.value.instituto,
        this.frmEducation.value.duracion, this.auth.currentUserValue.p_id_candidato, this.p_id_resumen_educacion);
        console.log("EDU", edu);
      this.spinner.hide();
      let i = this.arrEstudios.findIndex((x: any) => x.id_resumen_educacion == this.p_id_resumen_educacion);
      this.arrEstudios[i].grado = await this.arrGradoEscolar.find((x: any) => x.id_grado_escolar == this.frmEducation.value.grado).descripcion;
      this.arrEstudios[i].instituto = this.frmEducation.value.instituto;
      this.arrEstudios[i].duracion = this.frmEducation.value.duracion;
      this.arrEstudios[i].idGrado = this.frmEducation.value.grado;
      this.frmEducation.reset();
    }
  }

  async saveExperience() {
    this.submittedExperience = true;
    if (this.frmExperience.invalid) {
      return;
    }
    this.spinner.show();
    if (this.p_id_resumen_experience == 0) {
      // Registro
      let exp = await this.api.registroResumenEXP(this.frmExperience.value.empresa, this.frmExperience.value.giro,
        this.frmExperience.value.periodo, this.frmExperience.value.responsabilidades, this.auth.currentUserValue.p_id_candidato);
        console.log("EXP", exp);
      // reset form
      this.spinner.hide();

      this.arrExperiencias.push({
        empresa: this.frmExperience.value.empresa,
        giro: this.frmExperience.value.giro,
        responsabilidades: this.frmExperience.value.responsabilidades,
        periodo: this.frmExperience.value.periodo,
        id_resumen_experiencia: exp.p_id_resumen_experiencia
      });

      this.frmExperience.reset();
    } else {
      // Actualizo
      let exp = await this.api.updateResumenEXP(this.frmExperience.value.empresa, this.frmExperience.value.giro,
        this.frmExperience.value.periodo, this.frmExperience.value.responsabilidades, this.auth.currentUserValue.p_id_candidato, this.p_id_resumen_experience);
        console.log("EXP", exp);
      this.spinner.hide();
      let i = this.arrExperiencias.findIndex((x: any) => x.id_resumen_experiencia == this.p_id_resumen_experience);
      this.arrExperiencias[i].empresa = this.frmExperience.value.empresa;
      this.arrExperiencias[i].giro = this.frmExperience.value.giro;
      this.arrExperiencias[i].responsabilidades = this.frmExperience.value.responsabilidades;
      this.arrExperiencias[i].periodo = this.frmExperience.value.periodo;
      this.frmExperience.reset();
    }
  }

  fillEducation(item: any) {
    this.frmEducation.patchValue({
      grado: item.idGrado,
      instituto: item.instituto,
      duracion: item.duracion,
    });
    this.p_id_resumen_educacion = item.id_resumen_educacion;
  }

  fillExperience(item: any) {
    this.frmExperience.patchValue({
      empresa: item.empresa,
      giro: item.giro,
      responsabilidades: item.responsabilidades,
      periodo: item.periodo,
    });
    this.p_id_resumen_experience = item.id_resumen_experiencia;
  }
}
