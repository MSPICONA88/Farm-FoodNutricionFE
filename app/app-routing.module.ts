import { PrefixNot, compileClassMetadata } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarDietaComponent } from './Componentes/Dietas/consultar-dieta/consultar-dieta.component';
import { ModificarDietaComponent } from './Componentes/Dietas/modificar-dieta/modificar-dieta.component';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { DeleteLoteComponent } from './Componentes/Lotes/delete-lote/delete-lote.component';
import { ModificarLoteComponent } from './Componentes/Lotes/modificar-lote/modificar-lote.component';
import { RegistrarLotesComponent } from './Componentes/Lotes/registrar-lotes/registrar-lotes.component';
import { MainComponent } from './Componentes/main/main.component';
import { ConsultarComponent } from './Componentes/Usuarios/consultar/consultar.component';
import { UserComponent } from './Componentes/Usuarios/crear/user.component';
import { CreaAlimentosComponent } from './Componentes/Alimentos/crear-alimentos/crear-alimentos.component';
import { RegistrarDietaComponent } from './Componentes/Dietas/registrar-dieta/registrar-dieta.component';
import { PlanificarAlimentacionComponent } from './Componentes/Alimentacion/planificar-alimentacion/planificar-alimentacion.component';
import { RegistrarAlimentacionComponent } from './Componentes/Alimentacion/registrar-alimentacion/registrar-alimentacion.component';
import { RegistrarTratComponent } from './Componentes/Tratamientos/registrar-trat/registrar-trat.component';
import { ConsultarTratComponent } from './Componentes/Tratamientos/consultar-trat/consultar-trat.component';
import { ConsultarLoteComponent } from './Componentes/Lotes/consultar-lote/consultar-lote.component';
import { IngresarStockComponent } from './Componentes/Stock/ingresar-stock/ingresar-stock.component';
import { ConsultarStockComponent } from './Componentes/Stock/consultar-ingreso/consultar-ingreso.component';
import { RegistrarMoviComponent } from './Componentes/Stock/registrar-movi/registrar-movi.component';
import { ConsultarStockAliComponent } from './Componentes/Stock/consultar-stock-ali/consultar-stock-ali.component';
import { CardPesoListComponent } from './Componentes/Reportes/card-peso-list/card-peso-list.component';
import { LineIngresoAnimalesComponent } from './Componentes/Reportes/line-ingreso-animales/line-ingreso-animales.component';
import { StackBarAnimalesComponent } from './Componentes/Reportes/stack-bar-animales/stack-bar-animales.component';
import { PreguntasFrecuentesComponent } from './Componentes/home/preguntas-frecuentes/preguntas-frecuentes.component';
import { ConsultarPlaniComponent } from './Componentes/Alimentacion/consultar-plani/consultar-plani.component';
import { TerminosYCondicionesComponent } from './Componentes/home/terminos-ycondiciones/terminos-ycondiciones.component';
import { EgresarLotesComponent } from './Componentes/Lotes/egresar-lotes/egresar-lotes.component';
import { QuitarAnimalesComponent } from './Componentes/Lotes/quitar-animales/quitar-animales.component';
import { ListaLotesComponent } from './Componentes/Lotes/lista-lotes/lista-lotes.component';



// const routes: Routes = [
//   {path: '', component: HomeComponent },
//   {path: 'home', component:HomeComponent},
//   {path: 'institucion', component:InstitucionComponent},
//   {path: 'contacto', component:ContactoComponent},
//   {path: 'login', component:LoginComponent},
//   {path: 'dashboard', component: DashboardComponent},
//   {path: 'menuLateral', component: MenuLateralComponent, children: rutasHijas}
 
// ];

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: "crearUsu", component: UserComponent},
  {path: "consultarUsu", component: ConsultarComponent},
  {path: "registrarlote", component: RegistrarLotesComponent },
  {path: "consultarDietas", component: ConsultarDietaComponent },
  {path: "modificarlote/:idLote", component: ModificarLoteComponent},
  {path: "modificardieta/:idDieta", component: ModificarDietaComponent},
  {path: "deletelote/:idLote", component: DeleteLoteComponent},
  {path: "alimentos", component: CreaAlimentosComponent},
  {path: "registrarDieta", component: RegistrarDietaComponent},
  {path: "consultarDieta", component: ConsultarDietaComponent},
  {path: "planificarAli", component: PlanificarAlimentacionComponent},
  {path: "registrarAli", component: RegistrarAlimentacionComponent},
  {path: "registrarTrat", component: RegistrarTratComponent},
  {path: "consultarTrat", component: ConsultarTratComponent},
  {path: "registrarLotes", component: RegistrarLotesComponent},
  {path: "consultarLotes", component: ConsultarLoteComponent},
  {path: "modificarLotes", component: ModificarLoteComponent},
  {path: "registrarStock", component: IngresarStockComponent},
  {path: "registrarMov", component: RegistrarMoviComponent},
  {path: "consultarMov", component: ConsultarStockComponent},
  {path: "consultarStock", component: ConsultarStockAliComponent},
  {path: "reportCardPeso", component: CardPesoListComponent},
  {path: "reportLineIngreso", component: LineIngresoAnimalesComponent},
  {path: "reportStackBarAni", component: StackBarAnimalesComponent},
  {path: "reportListAliNecesario", component: ConsultarPlaniComponent},
  {path: "preguntas", component: PreguntasFrecuentesComponent},
  {path: "terminos", component: TerminosYCondicionesComponent},
  {path: "egresarLotes/:idLote", component: EgresarLotesComponent},
  {path: "quitarAnimales", component: QuitarAnimalesComponent},
  {path: "listaLotes", component: ListaLotesComponent},
];


// const rutasHijas: Routes =[
//   {path: 'usuariosForms', component: UsuariosFormsComponent},
//   {path: 'usuarios', component: UsuariosComponent},
//   {path: 'salas', component: SalasComponent},
//   {path: 'docentes', component: DocentesComponent},
//   {path: 'alumnos', component: AlumnosComponent},
//   {path: 'noticias', component: NoticiasFormsComponent},
//   {path: 'actividades', component: NoticiasFormsComponent},
//   {path: 'mensajes', component: NoticiasFormsComponent},
//   {path: 'notificaciones', component: NoticiasFormsComponent},
//   {path: 'tareas', component: NoticiasFormsComponent},

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
