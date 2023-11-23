import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TratamientoPorAnimal } from 'src/app/Interfaces/tratamientoPorAnimal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AltaTratamientoService {

  constructor(private http: HttpClient, 
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/tratamientos/";

  postCreate(tratAnimal: TratamientoPorAnimal): Observable<any> {
    const comando = {
      "idAnimal": tratAnimal.id_animal,
      "idTipoTratamiento": tratAnimal.id_tipo_trat,
      "medicacion": tratAnimal.medicacion,
      "fechaInicio": tratAnimal.fecha_inicio,
      "fechaFin": tratAnimal.fecha_fin
    }
    const url = this.apiUrlBase;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url+'altaTratAnimal', body, { 'headers': headers })
  }
  
}
