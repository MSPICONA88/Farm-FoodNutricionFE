import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PlanesAli } from 'src/app/Interfaces/planesAli';
import { AlimentacionService } from 'src/app/Services/Alimentacion/alimentacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-plani',
  templateUrl: './consultar-plani.component.html',
  styleUrls: ['./consultar-plani.component.css']
})
export class ConsultarPlaniComponent {
  fechaActual: string;
  fechanro: Date;
  listaPlanes: PlanesAli[];
  subscription = new Subscription();
  idPlanSel: number;
  asigIdPlan: boolean = false;
  formularioGroup: FormGroup;
  page: number;

  constructor(
    private formBuilder: FormBuilder,
    private planesServ: AlimentacionService,
    private http: HttpClient
  ) {
    
    this.fechaActual = new Date().toString();
    this.getPlanesAli();
    this.formularioGroup = this.formBuilder.group({
      idPlan: [''],
      fechaAlimentacion: ['', Validators.required],
      toneladasDispensadas: ['', Validators.required]

    });
  }

  getPlanesAli() {
    this.subscription.add(
      this.planesServ.traerPlaniAll().subscribe(
        (data) => {
          if (data.ok) {
            this.listaPlanes = data.listaPlanesAlimentacion;
            //alert(this.listaFinalidades[0].nombreFinalidad)
          } else {
            Swal.fire({
              title: 'Error al obtener el listado de planes de alimentación',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        })
    );
  }

  tomarIdPlan(idPlan: any) {

    console.log(idPlan);
    this.idPlanSel = idPlan;
    this.asigIdPlan = true;
  }


  limpiarForm() {
    this.formularioGroup.reset();
  }


  eliminarPlani(idPlan: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Eliminar planificación",
      text: "¿Está seguro que desea eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.planesServ.borrarPlani(idPlan).subscribe({
          next: (data) => {
            if (data.ok) {
              swalWithBootstrapButtons.fire({
                title: "Eliminar planificación",
                text: "La planificación ha sido eliminada",
                icon: "success"
              });
              this.cancelar();
            }
            else {
              swalWithBootstrapButtons.fire({
                title: "Eliminar planificación",
                text: data.error,
                icon: "error"
              });
            }

          },
          error: () => {
            swalWithBootstrapButtons.fire({
              title: "Eliminar planificación",
              text: "La planificación no pudo ser eliminada",
              icon: "error"
            });
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Eliminar planificación",
          text: "La transacción ha sido cancelada",
          icon: "error"
        });
      }
    });
  }

  cancelar() {
    this.getPlanesAli();
  }

}
