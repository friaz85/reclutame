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


/***********************************************************************************/
/***********************************************************************************/
  // Consumos IA
/***********************************************************************************/
/***********************************************************************************/


  async postCrearVacante(pregunta: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'pwd': 'fabriconsulting2024'
    };
    return this.http.post<any>('/api/crear-vacante', {
      conversation: [
        {
          pregunta: pregunta
        }
      ]
    }, { headers: headers }).toPromise();
  }

}
