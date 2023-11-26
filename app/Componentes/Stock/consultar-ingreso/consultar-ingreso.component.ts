import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngresoStockService } from 'src/app/Services/Stock/ingreso-stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-ingreso',
  templateUrl: './consultar-ingreso.component.html',
  styleUrls: ['./consultar-ingreso.component.css']
})
export class ConsultarStockComponent {
  fechaInicio: string;
  fechaFin: string;
  listaStockPorFechas: any = [];

  constructor(
    private stockService: IngresoStockService,
    private router: Router) { }
  private subscription = new Subscription();

  ngOnInit(): void {
    //this.cargarLotes();
  }



  isArrowDown(tipoMovimiento: string): boolean {
    return ['Caducidad', 'Deterioro', 'Errores', 'Alimentación'].includes(tipoMovimiento);
  }

  isArrowUp(tipoMovimiento: string): boolean {
    return tipoMovimiento === 'Ingreso';
  }


  cargarStock() {
    this.subscription.add(
      this.stockService.stockPorFecha(this.fechaInicio, this.fechaFin).subscribe(
        (data) => {
          if (data.ok) {
            this.listaStockPorFechas = data.listaStockPorFecha;
            console.log(this.listaStockPorFechas)
          }
          else {
            Swal.fire({
              title: 'Error al obtener el listado de stock',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }


  formatFechaIngreso(fechaIngreso: string): string {
    // Convertir la cadena a un objeto Date
    const dateObject = new Date(fechaIngreso);

    // Obtener los componentes de la fecha
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Los meses comienzan desde 0
    const year = dateObject.getFullYear();

    // Formatear la fecha en el formato deseado
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

    return formattedDate;
  }
}
