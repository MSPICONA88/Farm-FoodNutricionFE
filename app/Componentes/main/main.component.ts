import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComandoLogin } from 'src/app/Interfaces/comandoLogin';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/Usuario/Usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  viewName : string = "HOME";
  user = {} as ComandoLogin;
  token: string;
  logueado: boolean=false;

  constructor(private router: Router, private userServ: UsuarioService) { }

  ngOnInit(): void {
    this.setUserLogged();
    // this.validacionLogueo();
  }

  logOut() {
    Swal.fire({
      title: '¿Está seguro que quiere cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.userServ.setToken("", "", "");
        this.router.navigate(['login']);
      }
    })
  }

  setUserLogged() {
    this.token= this.userServ.getToken();
    this.user.usuario1= this.userServ.getUserName();
    this.user.rol = this.userServ.getRol();
    if(this.token!=null&& this.token!=''){
      this.logueado=true;
    }
  }

  // validacionLogueo(){
  //   this.userServ.authenticateUser(this.viewName).subscribe(
  //     (isAuthenticated: boolean) => {
  //       this.logueado = isAuthenticated;
  //     }
  //   );
  // }
  


  

  
}
