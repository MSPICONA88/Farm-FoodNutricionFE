import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComandoLogin } from 'src/app/Interfaces/comandoLogin';
import { Login } from 'src/app/Interfaces/login';
import { Usuario } from 'src/app/Interfaces/usuario';
import { LoginService } from 'src/app/Services/Usuario/Login/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  user = {} as ComandoLogin;
  loger = {} as Login;

  constructor(private router:Router, private loginServ: LoginService) { }

  ngOnInit(): void {
  }


    login() {
      if (this.validateParams()) {
        this.loginServ.postLogin(this.loger.usuario, this.loger.password).subscribe(
          (data) => {
            if (data.ok) {
              this.loginServ.setToken(data.id_usuario, data.nombreUsuario, data.rol);
              Swal.fire({
                title: 'Bienvenido',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.router.navigate(['/']);
              });
            } else {
              Swal.fire({
                title: 'Usuario y/o contraseña incorrecta',
                text: 'Usuario y/o contraseña incorrecta',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          },
          (err: HttpErrorResponse) => {
            
            
            if (err.status == HttpStatusCode.InternalServerError) {
              Swal.fire({
                title: 'Error en el Servicio',
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          }
        );
      } else {
        Swal.fire({
          title: 'Ingrese nombre de usuario y contraseña',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
      }
    }
    
    validateParams(): boolean {
      if (
        this.loger.usuario != null &&
        this.loger.usuario != '' &&
        this.loger.password != null &&
        this.loger.password != ''
      ) {
        return true;
      }
      return false;
    }
    
}


  


