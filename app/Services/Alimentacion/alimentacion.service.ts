import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComandoAli } from 'src/app/Interfaces/comandoAli';
import { ComandoPlani } from 'src/app/Interfaces/comandoPlani';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlimentacionService {

  constructor(private http: HttpClient,
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/planes";
  apiUrlBase2: string = environment.baseUrl + "/api/alimentacion";

  guardarPlani(dieta: ComandoPlani): Observable<any> {
    return this.http.post<any>(`${this.apiUrlBase}/registrarPlani`, dieta);
  }

  traerPlaniGetDate(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + '/traerPlaniGetDate');
  }

  registrarAli(ali: ComandoAli): Observable<any> {
    return this.http.post<any>(`${this.apiUrlBase2}/registrar`, ali);
  }

  

}
