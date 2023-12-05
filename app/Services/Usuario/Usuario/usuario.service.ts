import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ComandoPassword } from 'src/app/Interfaces/comandoPassword';
import { ComandoUsuario } from 'src/app/Interfaces/comandoUsuario';
import { Usuario } from 'src/app/Interfaces/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, 
    private router: Router) { }

  apiUrlBase: string = environment.baseUrl + "/api/usuario";
  userMapping : string[] = ["administrador", "veterinario", "operario"];

  postCreate(user: ComandoUsuario): Observable<any> {
    const comando = {
      "nombreApellido": user.nombreApellido,
      "usuario1": user.usuario1,
      "password": user.password,
      "email": user.email,
      "idRol": user.idRol
    }
    const url = this.apiUrlBase;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url+'/alta', body, { 'headers': headers })
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.apiUrlBase + "/" + id);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrlBase+'/todos');
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
  
  /* TOKEN SERVICES */
  setToken(token: string, userName: string, rol: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userRol", rol);
   
  }

  updatePass(idUsuario: number, comandoPass: ComandoPassword): Observable<any> {
    const url = `${this.apiUrlBase}/cambiarContrasena${idUsuario}`;
    return this.http.put(url, comandoPass);
  }

  /* AUTHENTICATION SERVICES */
  // authenticateUser(view: string): Observable<boolean> {
  //   let token = this.getToken();
  //   if(token != "" && token != null) {
  //     let rol = this.getRol();
  //     var viewRol = view.concat('_').concat(rol);
  //     if(this.userMapping.includes(viewRol)) {
  //       return true;
  //     }
  //     return false;
  //   } else {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  // }
  authenticateUser(view: string): Observable<boolean> {
    let token = this.getToken();

    if (token != "" && token != null) {
      let rol = this.getRol();
      var viewRol = view.concat('_').concat(rol);

      return of(this.userMapping.includes(viewRol));
    } else {
      this.router.navigate(['login']);
      return of(false);
    }
  }
}
