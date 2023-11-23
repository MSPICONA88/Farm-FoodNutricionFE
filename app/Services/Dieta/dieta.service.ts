import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComandoDieta } from 'src/app/Interfaces/comandoDieta';
import { Dieta } from 'src/app/Interfaces/dieta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(private http: HttpClient,
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/dieta";

  // getAllDietas(): Observable<any> {
  //   return this.http.get<any>(this.apiUrlBase + '/traerDietas');
  // }

  getAllDietasDet(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + '/traerDietasDet');
  }

  postCreate(dieta: Dieta): Observable<any> {
    const comando = {
      "nombreDieta": dieta.nombreDieta,
      // "fechaCreacion": dieta.fechaCreacion,
      "observacion": dieta.observacion
    }
    const url = this.apiUrlBase;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url+'/altaDieta', body, { 'headers': headers })
  }

  guardarDieta(dieta: ComandoDieta): Observable<any> {
    return this.http.post<any>(`${this.apiUrlBase}/altaDieta`, dieta);
  }

  getDieta(idDieta: number): Observable<any> {
    const url = `${this.apiUrlBase}/getDietaDet${idDieta}`;
    return this.http.get(url);
  }

  updateDieta(idDieta: number, dieta: any): Observable<any> {
    const url = `${this.apiUrlBase}/update${idDieta}`;
    return this.http.put(url, dieta);
  }


}
