import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StockReport } from 'src/app/Interfaces/stockReport';
import { IngresoStockService } from 'src/app/Services/Stock/ingreso-stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-stock',
  templateUrl: './control-stock.component.html',
  styleUrls: ['./control-stock.component.css']
})
export class ControlStockComponent {
  listadoStock: StockReport[]=[];
  page: number;
  public formulario : FormGroup;
  filtroStock: string = '' ;

  
  private subscription = new Subscription();


  constructor(
    private stockService: IngresoStockService,
    private el: ElementRef,
    private renderer: Renderer2
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

  getTooltipText(estado: string): string {
    switch (estado) {
      case 'SIN STOCK':
        return 'El stock actual está por debajo del stock requerido en más del 10%.';
      case 'MUY BAJO':
        return 'El stock de este producto es muy bajo.';
      case 'BAJO':
        return 'El stock actual está por debajo del stock requerido y la diferencia es inferior al 10%, lo que indica un nivel bajo pero aceptable.';
      case 'OK':
        return 'El stock actual es igual o ligeramente superior al stock requerido, dentro de un 10% de excedente o déficit.';
      case 'SOBRESTOCK':
        return 'El stock actual excede significativamente al stock requerido, en cuyo caso la cantidad a comprar se establece en 0.';
      default:
        return '';
    }
  }

}
