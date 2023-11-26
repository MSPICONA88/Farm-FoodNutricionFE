import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StockReport } from 'src/app/Interfaces/stockReport';
import { IngresoStockService } from 'src/app/Services/Stock/ingreso-stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-plani',
  templateUrl: './consultar-plani.component.html',
  styleUrls: ['./consultar-plani.component.css']
})
export class ConsultarPlaniComponent {
  listadoStock: StockReport[]=[];
  page: number;
  public formulario : FormGroup;
  filtroStock: string = '' ;

  
  private subscription = new Subscription();


  constructor(
    private stockService: IngresoStockService
  ){
  }

  ngOnInit(){
    this.cargarReporte();
  }


  
  cargarReporte() {
    this.subscription.add(
      this.stockService.reportStock().subscribe(
        (data) => {
          if (data!=null) {
            this.listadoStock = data;
            console.log(this.listadoStock)
          }
          else {
            Swal.fire({
              title: 'Error al obtener el listado de lotes',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }


}
