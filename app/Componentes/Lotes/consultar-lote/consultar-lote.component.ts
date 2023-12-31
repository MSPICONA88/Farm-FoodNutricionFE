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
  public page: number;

  constructor(
    private loteService: LoteService,
    private router: Router) {
    this.cargarLotesDef();
  }
  private subscription = new Subscription();
  ngOnInit(): void {
    this.cargarLotesDef();
  }



  cargarLotesDef() {
    // Obtener la fecha de hoy
    const fechaFin = new Date();

    // Obtener la fecha del primer día del mes anterior
    const fechaInicio = new Date();
    fechaInicio.setMonth(fechaInicio.getMonth() - 1);
    fechaInicio.setDate(1);

    // Formatear las fechas según tus necesidades
    const fechaInicioString = this.formatearFecha(fechaInicio);
    const fechaFinString = this.formatearFecha(fechaFin);
    this.subscription.add(
      this.loteService.listadoLotesDispPorFecha(fechaInicioString, fechaFinString).subscribe(
        (data) => {
          if (data.ok) {
            this.listaLotes = data.listaLotesDispPorFecha;
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


  cargarLotes() {
    this.subscription.add(
      this.loteService.listadoLotesDispPorFecha(this.fechaInicio, this.fechaFin).subscribe(
        (data) => {
          if (data.ok) {
            this.listaLotes = data.listaLotesDispPorFecha;
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

  mostrarComponente() {

  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
  
    // Asegurarse de que month y day tengan dos dígitos
    const monthString = month < 10 ? '0' + month : '' + month;
    const dayString = day < 10 ? '0' + day : '' + day;
  
    return `${year}-${monthString}-${dayString}`;
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

  eliminarLote(idLote: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Eliminar lote",
      text: "¿Está seguro que desea eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loteService.borrarLote(idLote).subscribe({
          next: (data) => {
            if (data.ok) {
              swalWithBootstrapButtons.fire({
                title: "Eliminar lote",
                text: "El lote " + data.idLote + " ha sido eliminado",
                icon: "success"
              });
              this.cancelar();
            }
            else {
              swalWithBootstrapButtons.fire({
                title: "Eliminar lote",
                text: data.error,
                icon: "error"
              });
            }

          },
          error: () => {
            swalWithBootstrapButtons.fire({
              title: "Eliminar lote",
              text: "El lote no pudo ser eliminado",
              icon: "error"
            });
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Eliminar lote",
          text: "La transacción ha sido cancelada",
          icon: "error"
        });
      }
    });
  }

}
