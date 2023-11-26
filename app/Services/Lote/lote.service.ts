import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComandoLote } from 'src/app/Interfaces/comandoLote';
import { Lote } from 'src/app/Interfaces/Lote';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private http: HttpClient, 
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/lote";
  URL: string= environment.baseUrl+"/api/lote/lotePorId"
  URL2: string= this.apiUrlBase + "/getLotesPorEspecie"

  postCreate(lote: Lote): Observable<any> {
    const comando = {
      "cantidadAnimales": lote.cantidadAnimales,
      "pesoIngreso": lote.pesoIngreso,
      "idFinalidad": lote.idFinalidad,
      "idRaza": lote.idRaza,
      "edadMeses": lote.edadMeses
    }
    const url = this.apiUrlBase + '/alta';
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url, body, { 'headers': headers })
  }


  lotePorFecha(fechaInicio: string, fechaFin: string): Observable<any> {
    const comando = {
          "fechaInicio": fechaInicio,
          "fechaFin": fechaFin
    }
    const url = this.apiUrlBase + '/getLotesPorFechas';
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    console.log(body);
    return this.http.post(url, body, { 'headers': headers })
  }

  lotePorFechaDef(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + '/getLotesPorFechasDef');
  }

  modificarLote(idLote: number, lote: ComandoLote): Observable<any>{
    const body = JSON.stringify(lote);
    const headers = { 'content-type': 'application/json' };
    const url = this.apiUrlBase + '/editarLote';
    return this.http.put<any>(url+'/'+idLote, body, { 'headers': headers });
  }

  borrarLote(idLote: number): Observable<any> {
    const url = `${this.apiUrlBase}/borrarLote/${idLote}`;
    return this.http.delete<any>(url);
  }


  lotePorId(id: string): Observable<Lote> {
    return this.http.get<Lote>(`${this.URL}/${id}`);
  }

  getLotesPorEspecie(idEspecie: string): Observable<any> {
    const url = `${this.URL2}?idEspecie=${idEspecie}`;
    return this.http.get<any>(url);
  }


  listadoLotesDispPorFecha(fechaInicio: string, fechaFin: string): Observable<any> {
    const comando = {
          "fechaInicio": fechaInicio,
          "fechaFin": fechaFin
    }
    const url = this.apiUrlBase + '/getLotesDisponibles';
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    console.log(body);
    return this.http.post(url, body, { 'headers': headers })
  }


  quitarAnimales(idLote: number, cantidadAnimalesADarDeBaja: number): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const url = this.apiUrlBase + '/bajaAnimales';
    return this.http.put<any>(url+'/'+idLote+'/'+cantidadAnimalesADarDeBaja, { 'headers': headers });
  }
}
