import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alimento } from 'src/app/Interfaces/alimento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  constructor(private http: HttpClient,
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/alimento";

  getAllAlimentos(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + '/traerTodos');
  }

  
  // createAlimento(alimento: Alimento): Observable<any> {
  //   const comando = {
  //     "nombreAlimento": alimento.nombreAlimento
  //   }
  //   const url = this.apiUrlBase+ 'altaConVerif';
  //   const headers = { 'content-type': 'application/json' };
  //   const body = JSON.stringify(comando);

  //   return this.http.post(url, body, { 'headers': headers })
  // }

  // crearAlimento(nombreAlimento: string) {
  //   return this.http.post(this.apiUrlBase + '/altaConVerif', { nombreAlimento });
  // }

  crearAlimento2(nombreAlimento: string): Observable<any> {
    const comando = {
      "nombreAlimento": nombreAlimento
    }
    const url = this.apiUrlBase+ '/altaConVerif';
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url, body, { 'headers': headers });

  }
}
