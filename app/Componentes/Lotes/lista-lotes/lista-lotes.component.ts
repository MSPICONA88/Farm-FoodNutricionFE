import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lote } from 'src/app/Interfaces/Lote';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-lotes',
  templateUrl: './lista-lotes.component.html',
  styleUrls: ['./lista-lotes.component.css']
})
export class ListaLotesComponent {
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
    //this.cargarLotesDef();
  }
  private subscription = new Subscription();
  ngOnInit(): void {
    this.cargarLotesDef();
  }



  cargarLotesDef() {
    this.subscription.add(
      this.loteService.lotePorFechaDef().subscribe(
        (data) => {
          if (data.ok) {
            this.listaLotes = data.listaLotesPorFecha;

            //alert(this.listaUsuarios[0].rol)
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

  mostrarComponente() {

  }

  formatFechaIngreso(fechaIngreso: string| null): string | null {
    // Convertir la cadena a un objeto Date
    // Verificar si fechaIngreso es null
    if (fechaIngreso === null) {
      return null;
    }
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
