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


}
