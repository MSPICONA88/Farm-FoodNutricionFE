import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {
    constructor(private http: HttpClient, private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/";
  URL: string= this.apiUrlBase + "reporte/especie";

  getAllEspecies(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + 'especie/traerTodas');
  }

  reportEspecieId(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  reportEspecieAll(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + 'reporte/especie');
  }

  reportLineAnimal(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + 'reporte/animalesPorEspecie');
  }


  reportLineFecha(fechaInicio: string, fechaFin: string): Observable<any> {
    const comando = {
          "fechaInicio": fechaInicio,
          "fechaFin": fechaFin
    }
    const url = this.apiUrlBase + 'reporte/animalesPorEspecieFecha';
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    console.log(body);
    return this.http.post(url, body, { 'headers': headers })
  }

}
