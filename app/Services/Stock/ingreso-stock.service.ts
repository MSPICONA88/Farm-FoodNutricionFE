import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResultStock } from 'src/app/Interfaces/resultStock';
import { Stock } from 'src/app/Interfaces/stock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresoStockService {

  constructor(private http: HttpClient,
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/stock";
  URL: string=environment.baseUrl + "/api/reporte/toneladasAlimentoCompra"

  postCreate(ingresoStock: Stock): Observable<any> {
    const comando = {
      "idAlimento": ingresoStock.idAlimento,
      "fechaRegistro": ingresoStock.fechaRegistro,
      "toneladas": ingresoStock.toneladas,
      "precioTonelada": ingresoStock.precioTonelada,
      "idTipoMovimiento": ingresoStock.idTipoMovimiento
      }
    const url = this.apiUrlBase;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url + '/altaStock', body, { 'headers': headers })
  }

  postMovi(ingresoStock: Stock): Observable<any> {
    const comando = {
      "idAlimento": ingresoStock.idAlimento,
      "fechaRegistro": ingresoStock.fechaRegistro,
      "toneladas": ingresoStock.toneladas,
      "precioTonelada": ingresoStock.precioTonelada,
      "idTipoMovimiento": ingresoStock.idTipoMovimiento
      }
    const url = this.apiUrlBase;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url + '/registrarMovi', body, { 'headers': headers })
  }

  stockPorFecha(fechaInicio: string, fechaFin: string): Observable<any> {
    const comando = {
          "fechaInicio": fechaInicio,
          "fechaFin": fechaFin
    }
    const url = this.apiUrlBase + '/getIngresoStockPorFechas';
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    //console.log(body);
    return this.http.post(url, body, { 'headers': headers })
  }

  stockPorAli(idAlimento: string): Observable<ResultStock>{
    return this.http.get<ResultStock>(`${this.apiUrlBase}/${idAlimento}`);
  }

  reportStock(): Observable<any>{
    return this.http.get<any>(this.URL)
  }

  
}
