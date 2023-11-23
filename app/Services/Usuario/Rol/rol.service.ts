import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComandoRoles } from 'src/app/Interfaces/comandoRoles';
import { Rol } from 'src/app/Interfaces/rol';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient, 
    private router: Router) { }
    
    apiUrlBase: string = environment.baseUrl + "/api/rol/traerRol";

    getAllRoles(): Observable<any> {
      return this.http.get<any>(this.apiUrlBase);
    }
}
