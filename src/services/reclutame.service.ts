import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";

import { map, catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReclutameService {

  private apiUrl = "https://apex.oracle.com/pls/apex/reclutame/apirest/";
  private apiIA = "https://fc-rh-dot-future-surge-426221-i6.uc.r.appspot.com/crear-vacante";
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "*/*",
    pwd: "123456"
  });

  constructor(private http: HttpClient) { }

  async getCategorias(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'categorias').toPromise();
  }

  async getPais(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catpaises').toPromise();
  }

  async getCiudades(idPais: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catciudades/' + idPais).toPromise();
  }

  async getSalario(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catsalario').toPromise();
  }

  async getGenero(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catgenero').toPromise();
  }

  async getExperiencia(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catexperiencia').toPromise();
  }

  async getGradoEscolar(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catgradoescolar').toPromise();
  }

  async getIndustria(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catindustria').toPromise();
  }

  async getNivelProfesional(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'catnivelprofesional').toPromise();
  }

  async getTipoTrabajo(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'cattipotrabajo').toPromise();
  }

  async getEmpresa(idEmpresa: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getempresa/' + idEmpresa).toPromise();
  }

  async getEmpresas(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getempresas').toPromise();
  }

  async registroUsuario(email: string, pwd: string, id_rol: number, token: string, id_empresa: number): Promise<any> {
    return this.http.post<any>(this.apiUrl + 'registrousuario', {
        "EMAIL": email,
        "PASSWORD": pwd,
        "ID_ROL": id_rol,
        "TOKEN": token,
        "FECHA_ACTUALIZACION": "",
        "EMAIL_VERIFICADO": 0,
        "ID_EMPRESA": id_empresa
    }).toPromise();
  }

  async registroEmpresa(nombre: string, id_pais: any, id_ciudad: any, telefono: any): Promise<any> {
    return this.http.post<any>(this.apiUrl + 'registroempresa', {
      "NOMBRE_EMPRESA": nombre,
      "EMAIL": "",
      "TELEFONO": 0,
      "SITIO_WEB": "",
      "ANIO_EMPRESA": "",
      "TAMANO_EQUIPO": "",
      "CATEGORIA_EMPRESA": "",
      "ACERCA_EMPRESA": "",
      "FACEBOOK_URL": "",
      "TWITTER_URL": "",
      "LINKEDIN_URL": "",
      "INSTAGRAM_URL": "",
      "ID_PAIS": parseInt(id_pais),
      "ID_CIUDAD": parseInt(id_ciudad),
      "DOMICILIO": "",
      "ACTIVO": 1
    }).toPromise();
  }

  async registroCandidato(nombre: string, apellido: string, email: string, telefono: any, id_usuario: number): Promise<any> {
    return this.http.post<any>(this.apiUrl + 'registrocandidato', {
      "NOMBRE": nombre,
      "APELLIDO": apellido,
      "EMAIL": email,
      "TELEFONO": telefono,
      "DESCRIPCION": "",
      "FACEBOOK_URL": "",
      "TWITTER_URL": "",
      "LINKEDIN_URL": "",
      "INSTAGRAM_URL": "",
      "ID_USUARIO": id_usuario,
      "ID_PAIS": 0,
      "ID_CIUDAD": 0,
      "DOMICILIO": "",
      "ACTIVO": 1
    }).toPromise();
  }

  async updateCandidato(nombre: string, apellido: string, email: string, telefono: any, descripcion: any,
    facebook: any,
    tweitter: any,
    lindein: any,
    intagram: any,
    idPais: any,
    idCiudad: any,
    domicilio: any, idCandidato: any): Promise<any> {
    return this.http.post<any>(this.apiUrl + 'updateCandidato', {
      "p_id_candidato": parseInt(idCandidato),
      "p_nombre": nombre,
      "p_apellido": apellido,
      "p_email": email,
      "p_telefono": telefono,
      "p_descripcion": descripcion,
      "p_facebook_url": facebook,
      "p_twitter_url": tweitter,
      "p_linkedin_url":lindein ,
      "p_instagram_url": intagram,
      "p_id_pais": parseInt(idPais),
      "p_id_ciudad": parseInt(idCiudad),
      "p_domicilio": domicilio,
      "p_activo": 1
    }).toPromise();
  }

  async registroReclutador(nombre: string, apellido: string, email: string, id_usuario: any, id_empresa: any, telefono: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'registroreclutador', {
      "NOMBRE": nombre,
      "APELLIDOS": apellido,
      "EMAIL": email,
      "TELEFONO": parseInt(telefono),
      "ID_USUARIO": parseInt(id_usuario),
      "ID_EMPRESA": parseInt(id_empresa)
    }).toPromise();
  }

  async updateEmpresa (id_empresa: any, nombre: any, email: any, sitioWeb: any, anio: any, tamanoEquipo: any, categoria: any, acerca: any, facebook: any, twitter: any, linkedin: any, instagram: any, id_pais: any, id_ciudad: any, domicilio: any, telefono: any): Promise<any> {

    console.log(JSON.stringify({
      "ID_EMPRESA": parseInt(id_empresa),
      "NOMBRE_EMPRESA": nombre,
      "EMAIL": email,
      "TELEFONO": parseInt(telefono),
      "SITIO_WEB": sitioWeb,
      "ANIO_EMPRESA": parseInt(anio),
      "TAMANO_EQUIPO": tamanoEquipo,
      "CATEGORIA_EMPRESA": categoria,
      "ACERCA_EMPRESA": acerca,
      "FACEBOOK_URL": facebook,
      "TWITTER_URL": twitter,
      "LINKEDIN_URL": linkedin,
      "INSTAGRAM_URL": instagram,
      "ID_PAIS": parseInt(id_pais),
      "ID_CIUDAD": parseInt(id_ciudad),
      "DOMICILIO": domicilio,
      "ACTIVO": 1
    }));

    return this.http.post<any>(this.apiUrl + 'updateempresa', {
      "ID_EMPRESA": parseInt(id_empresa),
      "NOMBRE_EMPRESA": nombre,
      "EMAIL": email,
      "TELEFONO": parseInt(telefono),
      "SITIO_WEB": sitioWeb,
      "ANIO_EMPRESA": parseInt(anio),
      "TAMANO_EQUIPO": tamanoEquipo,
      "CATEGORIA_EMPRESA": categoria,
      "ACERCA_EMPRESA": acerca,
      "FACEBOOK_URL": facebook,
      "TWITTER_URL": twitter,
      "LINKEDIN_URL": linkedin,
      "INSTAGRAM_URL": instagram,
      "ID_PAIS": parseInt(id_pais),
      "ID_CIUDAD": parseInt(id_ciudad),
      "DOMICILIO": domicilio,
      "ACTIVO": 1
    }).toPromise();
  }

  async registroVacante (
    p_titulo_vacante: any,
    p_descripcion_vacante: any,
    p_email: any,
    p_categoria: any,
    p_tipo_trabajo: any,
    p_salario: any,
    p_nivel_profesional: any,
    p_experiencia: any,
    p_genero: any,
    p_industria: any,
    p_grado_escolar: any,
    p_fecha_limite_solicitud: any,
    p_pais: any,
    p_ciudad: any,
    p_direccion: any,
    p_id_empresa: any,
    p_id_reclutador: any,){

      console.log(JSON.stringify({
        "p_titulo_vacante": p_titulo_vacante,
        "p_descripcion_vacante": p_descripcion_vacante,
        "p_email": p_email,
        "p_categoria": p_categoria,
        "p_tipo_trabajo": p_tipo_trabajo,
        "p_salario": p_salario,
        "p_nivel_profesional": p_nivel_profesional,
        "p_experiencia": p_experiencia,
        "p_genero": p_genero,
        "p_industria": p_industria,
        "p_grado_escolar": p_grado_escolar,
        "p_fecha_limite_solicitud": p_fecha_limite_solicitud,
        "p_pais": p_pais,
        "p_ciudad": p_ciudad,
        "p_direccion": p_direccion,
        "p_id_empresa": parseInt(p_id_empresa),
        "p_id_reclutador": parseInt(p_id_reclutador),
      }));



    return this.http.post<any>(this.apiUrl + 'registroVacante', {
      "p_titulo_vacante": p_titulo_vacante,
      "p_descripcion_vacante": p_descripcion_vacante,
      "p_email": p_email,
      "p_categoria": p_categoria,
      "p_tipo_trabajo": p_tipo_trabajo,
      "p_salario": p_salario,
      "p_nivel_profesional": p_nivel_profesional,
      "p_experiencia": p_experiencia,
      "p_genero": p_genero,
      "p_industria": p_industria,
      "p_grado_escolar": p_grado_escolar,
      "p_fecha_limite_solicitud": p_fecha_limite_solicitud,
      "p_pais": p_pais,
      "p_ciudad": p_ciudad,
      "p_direccion": p_direccion,
      "p_id_empresa": parseInt(p_id_empresa),
      "p_id_reclutador": parseInt(p_id_reclutador),
    }).toPromise();
  }

  async getProfile(token: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getProfile/' + token).toPromise();
  }

  async getReclutador(idReclutador: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getReclutador/' + idReclutador).toPromise();
  }

  async getCandidato(idCandidato: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getCandidato/' + idCandidato).toPromise();
  }

  async getUsuario(idUsuario: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getUsuario/' + idUsuario).toPromise();
  }

  async getRoles(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getRoles').toPromise();
  }

  async getRol(idRol: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getRol/' + idRol).toPromise();
  }

  async getVacante(idVacante: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getVacante/' + idVacante).toPromise();
  }

  async getVacantesReclutador(idReclutador: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getVacantesReclutador/' + idReclutador).toPromise();
  }

  async getVacantes(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getVacantes').toPromise();
  }

  async registroResumenDP(nombre: string, apellido: string, email: string, telefono: any, idGenero: any, idPais: any, direccion: any, idCandidato: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'registroResumenDP', {
      "p_nombres": nombre,
      "p_apellidos": apellido,
      "p_email": email,
      "p_telefono": telefono,
      "p_id_genero": parseInt(idGenero),
      "p_id_pais": parseInt(idPais),
      "p_direccion": telefono,
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async registroResumenCS(objetivo: string, salarioActual: string, salarioEsperado: string, idTipoTrabajo: any, idCandidato: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'registroResumenCS', {
      "p_objetivo": objetivo,
      "p_salario_actual":parseFloat(salarioActual),
      "p_sueldo_esperado": parseFloat(salarioEsperado),
      "p_id_tipo_trabajo": parseInt(idTipoTrabajo),
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async registroResumenEDU(idGradoEscolar: string, instituto: string, duracion: string, idCandidato: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'registroResumenEDU', {
      "p_id_grado_escolar": parseInt(idGradoEscolar),
      "p_nombre_instituto": instituto,
      "p_duracion": duracion,
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async registroResumenEXP(empresa: string, giro: string, preiodo: string, responsabilidades: any, idCandidato: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'registroResumenEXP', {
      "p_nombre_empresa": empresa,
      "p_giro_empresa": giro,
      "p_periodo_empleo": preiodo,
      "p_responsabilidades": responsabilidades,
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async getResumenCS(idCandidato: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getResumenCS/' + idCandidato).toPromise();
  }

  async getResumenDP(idCandidato: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getResumenDP/' + idCandidato).toPromise();
  }

  async getResumenEDU(idCandidato: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getResumenEDU/' + idCandidato).toPromise();
  }

  async getResumenEXP(idCandidato: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getResumenEXP/' + idCandidato).toPromise();
  }

  async updateResumenCS(objetivo: string, salarioActual: string, salarioEsperado: string, idTipoTrabajo: any, idCandidato: any, idResumenCarrera: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'updateResumenCS', {
      "p_id_resumen_carrera": parseInt(idResumenCarrera),
      "p_objetivo": objetivo,
      "p_salario_actual":parseFloat(salarioActual),
      "p_sueldo_esperado": parseFloat(salarioEsperado),
      "p_id_tipo_trabajo": parseInt(idTipoTrabajo),
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async updateResumenEDU(idGradoEscolar: string, instituto: string, duracion: string, idCandidato: any, idResumenEducacion: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'updateResumenEDU', {
      "p_id_resumen_educacion": parseInt(idResumenEducacion),
      "p_id_grado_escolar": parseInt(idGradoEscolar),
      "p_nombre_instituto": instituto,
      "p_duracion": duracion,
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async updateResumenEXP(empresa: string, giro: string, preiodo: string, responsabilidades: any, idCandidato: any, idResumenExperiencia: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'updateResumenEXP', {
      "p_id_resumen_experiencia": parseInt(idResumenExperiencia),
      "p_nombre_empresa": empresa,
      "p_giro_empresa": giro,
      "p_periodo_empleo": preiodo,
      "p_responsabilidades": responsabilidades,
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async deleteResumenEDU(idCandidato: any, idResumenEducacion: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'deleteResumenEDU', {
      "p_id_resumen_educacion": parseInt(idResumenEducacion),
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async deleteResumenEXP(idCandidato: any, idResumenExperiencia: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'deleteResumenEXP', {
      "p_id_resumen_experiencia": parseInt(idResumenExperiencia),
      "p_responsabilidades": idCandidato,
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async registroPostulacion(idCandidato: any, idVacante: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'registroPostulacion', {
      "p_id_vacante": parseInt(idVacante),
      "p_id_candidato": parseInt(idCandidato),

    }).toPromise();
  }

  async getAplicantes(idReclutador: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getAplicantes/' + idReclutador).toPromise();
  }

  async getVacantesAplicados(idCandidato: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getVacantesAplicados/' + idCandidato).toPromise();
  }

  async getTarjetasDashboard(idReclutador: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getTarjetasDashboardReclutador/' + idReclutador).toPromise();
  }

  async geNotificaciones(idReclutador: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getNotificaciones/' + idReclutador).toPromise();
  }

  async getCandidatosPostulaciones(idReclutador: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getCandidatosPostulaciones/' + idReclutador).toPromise();
  }

  async getCandidatosPorVacante(idCandidato: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getCandidatosPorVacante/' + idCandidato).toPromise();
  }

  async getEstatusPostulacion(): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getEstatusPostulacion').toPromise();
  }

  async updateEstatusPostulacion(idCandidato: any, idVacante: any, p_id_estatus_postulacion: any): Promise<any> {

    return this.http.post<any>(this.apiUrl + 'updateEstatusPostulacion', {
      "p_id_candidato": parseInt(idCandidato),
      "p_id_vacante": parseInt(idVacante),
      "p_id_estatus_postulacion": parseInt(p_id_estatus_postulacion),

    }).toPromise();
  }

  async getAplicantesRecientes(idReclutador: any): Promise<any> {
    return this.http.get<any>(this.apiUrl + 'getAplicantesRecientes/' + idReclutador).toPromise();
  }

/***********************************************************************************/
/***********************************************************************************/
  // Consumos IA
/***********************************************************************************/
/***********************************************************************************/


  async postCrearVacante(pregunta: string, respuesta: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'pwd': 'fabriconsulting2024',
      'openaiapikey': 'sk-svcacct-m-sfS1MmN1QrDZGK1mTcosGU6JeQETfsgN9IDtqC8z3hACLTg5p96e15O_GMx6W_7sljQShJYO0T3BlbkFJh2Q-MeMRUQowNdsAlMX3PBcfX1pwnMood5oTxoAB6Go_-GP7KUQwBinxCAdxooim59YfYYItfAA'
    };

    let arrSend = {};

    if (respuesta != '') {
    arrSend = {
      conversation: [
        {
          pregunta: pregunta
        },
        {
          respuesta: respuesta
        }
      ]
    };
  } else {
    arrSend = {
      conversation: [
        {
          pregunta: pregunta
        }
      ]
    };
  }

    return this.http.post<any>('/api/crear-vacante', arrSend, { headers: headers }).toPromise();
  }

}
