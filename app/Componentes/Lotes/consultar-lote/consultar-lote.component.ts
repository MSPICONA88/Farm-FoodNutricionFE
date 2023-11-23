import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lote } from 'src/app/Interfaces/Lote';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-lote',
  templateUrl: './consultar-lote.component.html',
  styleUrls: ['./consultar-lote.component.css']
})
export class ConsultarLoteComponent {
  fechaInicio: string;
  fechaFin: string;
  listaLotes: any = [];
  hide: boolean = false;
  selectLote = {} as Lote;
  mostrarModificarLote: boolean = false;

  constructor(
    private loteService: LoteService,
    private router: Router) { }
  private subscription = new Subscription();
  ngOnInit(): void {
    //this.cargarLotes();
  }


  cargarLotes() {
    this.subscription.add(
      this.loteService.lotePorFecha(this.fechaInicio, this.fechaFin).subscribe(
        (data) => {
          if (data.ok) {
            this.listaLotes = data.listaLotesPorFecha;
            console.log(this.listaLotes)
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

  modificarLote(lote: Lote) {
    this.hide = true;
    this.selectLote = lote;
  }
  

  cancelar() {
    this.selectLote = {} as Lote;
    this.hide = false;
    this.cargarLotes();
  }

  mostrarComponente(){

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
