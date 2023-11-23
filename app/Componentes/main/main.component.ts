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
  isCrearUsuario: boolean=false;
  isConsultarUsuarios : boolean = false;
  isCrearAlimentos : boolean = false;
  isHome : boolean = true;
  isRegistrarLote: boolean = false;
  isConsultarTrat: boolean=false;
  isRegistrarTrat: boolean = false;
  isConsultarLote: boolean = false;
  isModificarLote: boolean = false;
  isIngresarStock: boolean = false;
  isConsultarStockPorFecha: boolean= false;
  isConsultarStockPorAli: boolean= false;
  isRegistrarMoviStock: boolean = false;
  isRegistrarDieta: boolean = false;
  isConsultarDieta: boolean=false;
  isPlanificarAli: boolean=false;
  isRegistrarAli: boolean=false;
  isStackBarAnimales: boolean=false;
  isCardPesoAnimales: boolean=false;
  isLineIngresoAni: boolean=false;
  isConsultarPlani: boolean=false;
  isPreguntas: boolean=false;

  constructor(private router: Router, private userServ: UsuarioService) { }

  ngOnInit(): void {
    this.userServ.authenticateUser(this.viewName);
    this.setUserLogged();
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
    this.user.usuario1= this.userServ.getUserName();
    this.user.rol = this.userServ.getRol();
  }

  cleanFlags() {
    this.isHome = false;
    this.isCrearUsuario=false;
    this.isCrearAlimentos = false;
    this.isConsultarUsuarios = false;
    this.isRegistrarTrat = false;
    this.isRegistrarLote = false;
    this.isConsultarTrat = false;
    this.isConsultarLote = false;
    this.isModificarLote = false;
    this.isIngresarStock= false;
    this.isConsultarStockPorFecha=false;
    this.isConsultarStockPorAli=false;
    this.isRegistrarMoviStock=false;
    this.isRegistrarDieta=false;
    this.isConsultarDieta=false;
    this.isPlanificarAli=false;
    this.isRegistrarAli=false;
    this.isStackBarAnimales=false;
    this.isCardPesoAnimales=false;
    this.isLineIngresoAni=false;
    this.isConsultarPlani=false;
    this.isPreguntas=false;
  }

  crearUsuario(){
      this.cleanFlags();
    this.isCrearUsuario = true;
    
  }

  consultarUsuarios(){
    this.cleanFlags();
    this.isConsultarUsuarios = true;
  }

  crearAlimentos(){
    this.cleanFlags();
    this.isCrearAlimentos = true;
  }

  crearTratamiento(){
    this.cleanFlags();
    this.isRegistrarTrat = true;

  }

  consultarTratamiento(){
    this.cleanFlags();
    this.isConsultarTrat=true;
  }

  registrarLote(){
    this.cleanFlags();
    this.isRegistrarLote = true;
  }

  consultarLote(){
    this.cleanFlags();
    this.isConsultarLote = true;
  }

  modificarLote(){
    this.cleanFlags();
    this.isModificarLote = true;
  }

  ingresarStock(){
    this.cleanFlags();
    this.isIngresarStock = true;
  }

  consultarStockPorFecha(){
    this.cleanFlags();
    this.isConsultarStockPorFecha = true;
  }

  consultarStockPorAli(){
    this.cleanFlags();
    this.isConsultarStockPorAli = true;
  }

  registrarMoviStock(){
    this.cleanFlags();
    this.isRegistrarMoviStock = true;
  }

  registrarDieta(){
    this.cleanFlags();
    this.isRegistrarDieta = true;
  }

  consultarDieta(){
    this.cleanFlags();
    this.isConsultarDieta = true;
  }
  
  planificarAli(){
    this.cleanFlags();
    this.isPlanificarAli = true;
  }

  registrarAli(){
    this.cleanFlags();
    this.isRegistrarAli = true;
  }

  home() {
    this.cleanFlags();
    this.isHome = true;
  }

  preguntas(){
    this.cleanFlags();
    this.isPreguntas = true;
  }

  reporteAnimales(){
    this.cleanFlags();
    this.isStackBarAnimales = true;
  }

  pesoAnimales(){
    this.cleanFlags();
    this.isCardPesoAnimales = true;
  }
  
  ingresoAnimales(){
    this.cleanFlags();
    this.isLineIngresoAni = true;
  }
  consultarPlani(){
    this.cleanFlags();
    this.isConsultarPlani = true;
  }
}
