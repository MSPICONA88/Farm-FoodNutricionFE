import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AnimalExistence } from 'src/app/Interfaces/animalExistence';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  private baseUrl: string = environment.baseUrl + '/api/animales/traerDisponibles';
  apiUrlBase: string = environment.baseUrl + "/api/animales";
  constructor(private http: HttpClient) { }

  getAnimalesDisponibles(idEspecie?: number, idRaza?: number): Observable<AnimalExistence[]> {
    let params = new HttpParams();

    if (idEspecie) {
      params = params.set('idEspecie', idEspecie.toString());
    }

    if (idRaza) {
      params = params.set('idRaza', idRaza.toString());
    }

    const url = this.baseUrl + '?' + params.toString(); // Obtener la URL completa

    console.log('URL llamada:', url); // Imprimir la URL

    return this.http.get<AnimalExistence[]>(this.baseUrl, { params });
  }

  getAllAnimales(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + '/traerTodosDisponibles');
  }
}
