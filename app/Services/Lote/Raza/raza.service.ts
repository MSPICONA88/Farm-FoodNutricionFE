import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  private apiUrl = environment.baseUrl+ "/api/raza/razaPorEspecie"; // La URL de la API en tu backend

  constructor(private http: HttpClient, private router: Router) { }
  

  getRazasPorEspecie(idEspecie: number): Observable<any> {

    const headers = { 'content-type': 'application/json' };
    
    return this.http.get<any>(this.apiUrl+'/'+idEspecie, { 'headers': headers });
  }
}

