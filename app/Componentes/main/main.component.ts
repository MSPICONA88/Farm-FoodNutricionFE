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
  rol: string;
  banderaAdm: boolean=false;
  banderaVet: boolean=false;
  banderaOpe: boolean=false;

  constructor(private router: Router, private userServ: UsuarioService) { 
    
  }

  ngOnInit(): void {
    this.setUserLogged();
    this.getRol();
    this.asignarBanderas();
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

  getRol(){
    this.rol= this.userServ.getRol();
  }

  asignarBanderas() {
    switch (this.rol) {
      case 'Administrador':
        this.banderaAdm = true;
        break;
      case 'Veterinario':
        this.banderaVet = true;
        break;
      case 'Operario':
        this.banderaOpe = true;
        break;
      // Agrega más casos según tus roles
      default:
        // Manejo para otros roles o cualquier otro caso
        break;
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
