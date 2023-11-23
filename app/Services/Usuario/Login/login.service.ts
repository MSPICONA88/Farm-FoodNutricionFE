import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrlBase: string = environment.baseUrl + "/api/usuario";
  userMapping : string[] = ["ADM", "VET", "OPE"];


  constructor(private http: HttpClient, private router: Router) { }

  postLogin(usuario: string, password: string): Observable<any> {
    const comando = {
          "usuario": usuario,
          "password": password
    }
    const url = this.apiUrlBase + "/login";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    console.log(body);
    return this.http.post(url, body, { 'headers': headers })
  }
  
  /* TOKEN SERVICES */
  setToken(token: string, userName: string, rol: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userRol", rol);
   
  }

  getToken() : any {
    return localStorage.getItem("token");
  }

  getRol() : any {
    return localStorage.getItem("userRol");
  }

  getUserName() : any {
    return localStorage.getItem("userName");
  }

 

  
}
