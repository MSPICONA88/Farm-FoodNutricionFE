import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/Componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Componentes/home/home.component';
import { MainComponent } from './Componentes/main/main.component';
import { UserComponent } from './Componentes/Usuarios/crear/user.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { ConsultarComponent } from './Componentes/Usuarios/consultar/consultar.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { CreaAlimentosComponent } from './Componentes/Alimentos/crear-alimentos/crear-alimentos.component';
import { RegistrarLotesComponent } from './Componentes/Lotes/registrar-lotes/registrar-lotes.component';
import { RegistrarTratComponent } from './Componentes/Tratamientos/registrar-trat/registrar-trat.component';
import { ConsultarTratComponent } from './Componentes/Tratamientos/consultar-trat/consultar-trat.component';
import { ConsultarLoteComponent } from './Componentes/Lotes/consultar-lote/consultar-lote.component';
import { ModificarLoteComponent } from './Componentes/Lotes/modificar-lote/modificar-lote.component';
import { DeleteLoteComponent } from './Componentes/Lotes/delete-lote/delete-lote.component';
import { IngresarStockComponent } from './Componentes/Stock/ingresar-stock/ingresar-stock.component';
import { ConsultarStockComponent } from './Componentes/Stock/consultar-ingreso/consultar-ingreso.component';
import { ConsultarStockAliComponent } from './Componentes/Stock/consultar-stock-ali/consultar-stock-ali.component';
import { RegistrarMoviComponent } from './Componentes/Stock/registrar-movi/registrar-movi.component';
import { RegistrarDietaComponent } from './Componentes/Dietas/registrar-dieta/registrar-dieta.component';
import { ConsultarDietaComponent } from './Componentes/Dietas/consultar-dieta/consultar-dieta.component';
import { FiltroDietasPipe } from './Pipes/filtro-dietas.pipe';
import { ModificarDietaComponent } from './Componentes/Dietas/modificar-dieta/modificar-dieta.component';
import { PlanificarAlimentacionComponent } from './Componentes/Alimentacion/planificar-alimentacion/planificar-alimentacion.component';
import { RegistrarAlimentacionComponent } from './Componentes/Alimentacion/registrar-alimentacion/registrar-alimentacion.component';
import { FiltroTratPipe } from './Pipes/filtro-trat.pipe';
import { StackBarAnimalesComponent } from './Componentes/Reportes/stack-bar-animales/stack-bar-animales.component';
import { CardPesoListComponent } from './Componentes/Reportes/card-peso-list/card-peso-list.component';
import { LineIngresoAnimalesComponent } from './Componentes/Reportes/line-ingreso-animales/line-ingreso-animales.component';
import { ControlStockComponent } from './Componentes/Reportes/control-stock/control-stock.component';
import { FiltroStockPipe } from './Pipes/filtro-stock.pipe';
import { PreguntasFrecuentesComponent } from './Componentes/home/preguntas-frecuentes/preguntas-frecuentes.component';
import { CustomNumberPipe } from './Pipes/custom-number.pipe';
import { LOCALE_ID } from '@angular/core';
import { TerminosYCondicionesComponent } from './Componentes/home/terminos-ycondiciones/terminos-ycondiciones.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { EgresarLotesComponent } from './Componentes/Lotes/egresar-lotes/egresar-lotes.component';
import { QuitarAnimalesComponent } from './Componentes/Lotes/quitar-animales/quitar-animales.component';
import { ListaLotesComponent } from './Componentes/Lotes/lista-lotes/lista-lotes.component';
import { ConsultarPlaniComponent } from './Componentes/Alimentacion/consultar-plani/consultar-plani.component';
import { CambiarPassComponent } from './Componentes/Usuarios/cambiar-pass/cambiar-pass.component';
import { jsPDF } from "jspdf";



// Registra la configuración regional para "es-ES"
registerLocaleData(localeEs);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    UserComponent,
    HeaderComponent,
    ConsultarComponent,
    FilterPipe,
    CreaAlimentosComponent,
    RegistrarLotesComponent,
    RegistrarTratComponent,
    ConsultarTratComponent,
    ConsultarLoteComponent,
    ModificarLoteComponent,
    DeleteLoteComponent,
    IngresarStockComponent,
    ConsultarStockComponent,
    ConsultarStockAliComponent,
    RegistrarMoviComponent,
    RegistrarDietaComponent,
    ConsultarDietaComponent,
    FiltroDietasPipe,
    ModificarDietaComponent,
    PlanificarAlimentacionComponent,
    RegistrarAlimentacionComponent,
    FiltroTratPipe,
    StackBarAnimalesComponent,
    CardPesoListComponent,
    LineIngresoAnimalesComponent,
    ControlStockComponent,
    FiltroStockPipe,
    PreguntasFrecuentesComponent,
    CustomNumberPipe,
    TerminosYCondicionesComponent,
    EgresarLotesComponent,
    QuitarAnimalesComponent,
    ListaLotesComponent,
    ConsultarPlaniComponent,
    CambiarPassComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    

    
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
