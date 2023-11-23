import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaTratamientoService {

  apiUrlBase: string = environment.baseUrl + "/api/tratamientos/getPorFechas";
  


  constructor(private http: HttpClient, private router: Router) { }


  tratPorFecha(fechaInicio: string, fechaFin: string): Observable<any> {
    const comando = {
          "fechaInicio": fechaInicio,
          "fechaFin": fechaFin
    }
    
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    console.log(body);
    return this.http.post(this.apiUrlBase, body, { 'headers': headers })
  }

}
