import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposTratamientoService {

  private apiUrl = environment.baseUrl+ "/api/tratamiento/traerTipo"; // La URL de la API en tu backend

  constructor(private http: HttpClient, private router: Router) { }
  

  getTiposTratamiento(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }
}
