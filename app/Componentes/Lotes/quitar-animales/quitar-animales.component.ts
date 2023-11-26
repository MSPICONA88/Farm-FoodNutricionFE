import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription, catchError, map } from 'rxjs';
import { Lote } from 'src/app/Interfaces/Lote';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quitar-animales',
  templateUrl: './quitar-animales.component.html',
  styleUrls: ['./quitar-animales.component.css']
})
export class QuitarAnimalesComponent {
  fechaInicio: string;
  fechaFin: string;
  listaLotes: any = [];
  hide: boolean = false;
  selectLote = {} as Lote;
  mostrarModificarLote: boolean = false;
  public page: number;
  quitarAnimal: boolean = false;
  idLote: number;
  cantidadActual: number;
  lotePorId: any;

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

  cargarCantPorLote(id: number): Observable<number> {
    return this.loteService.lotePorId(id.toString()).pipe(
      map(respuesta => respuesta.cantidadActual),
      catchError(() => {
        Swal.fire({
          title: 'Error al obtener el lote',
          icon: 'error',
          confirmButtonText: "Ok"
        });
        return EMPTY;
      })
    );
  }
  

  quitarAnimales(id: number) {
    this.cargarCantPorLote(id).subscribe(cantidadActual => {
      console.log(id);
      Swal.fire({
        title: "Ingrese la cantidad de animales a dar de baja",
        icon: "question",
        input: "text",
        inputLabel: "(max: " + (cantidadActual - 1).toString() + ")",
        inputAttributes: {
          min: "1",
          max: (cantidadActual - 1).toString(),
          step: "1"
        },
        inputValue: 1,
        showCancelButton: true,
        confirmButtonText: "Siguiente",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          const cantidadAnimales = result.value;
  
          // Validar que la cantidadAnimales no sea negativa y no supere la cantidadActual
          if (cantidadAnimales < 0 || cantidadAnimales > cantidadActual - 1) {
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: `La cantidad de animales no puede ser negativa ni superar la cantidad máxima permitida (${cantidadActual - 1})`,
              confirmButtonText: 'Ok',
            });
            return;  // Detener la ejecución si la cantidadAnimales es negativa o supera la cantidadActual
          }
  
          // Muestra una segunda confirmación antes de realizar la operación principal
          Swal.fire({
            title: 'Confirmar baja de animales',
            icon: 'question',
            text: `¿Está seguro de dar de baja ${cantidadAnimales} animales?`,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((confirmationResult) => {
            if (confirmationResult.isConfirmed) {
              // Realiza la operación principal si la confirmación es exitosa
              this.subscription.add(
                this.loteService.quitarAnimales(id, cantidadAnimales).subscribe({
                  next: (respuesta) => {
                    if (respuesta.ok) {
                      Swal.fire({
                        title: 'Baja realizada con éxito',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                      }).then(() => {
                        this.cargarLotes();
                      });
                    }
                  },
                  error: () => {
                    Swal.fire({
                      title: 'Error al dar de baja',
                      icon: 'error',
                      confirmButtonText: "Ok"
                    }).then(() => {
                      this.cargarLotes();
                    });
                  }
                })
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // El usuario hizo clic en "Cancelar"
          // Aquí puedes manejar la cancelación, si es necesario
        }
      });
    });
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