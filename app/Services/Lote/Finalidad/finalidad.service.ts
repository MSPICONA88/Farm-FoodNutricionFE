import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinalidadService {

  constructor(private http: HttpClient,
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/finalidad";

  getAllFinalidades(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase + '/traerTodas');
  }
}
