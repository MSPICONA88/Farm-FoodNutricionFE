import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ComandoAli } from 'src/app/Interfaces/comandoAli';
import { PlanesAli } from 'src/app/Interfaces/planesAli';
import { AlimentacionService } from 'src/app/Services/Alimentacion/alimentacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-alimentacion',
  templateUrl: './registrar-alimentacion.component.html',
  styleUrls: ['./registrar-alimentacion.component.css']
})
export class RegistrarAlimentacionComponent {
  fechaActual: string;
  listaPlanes: PlanesAli[];
  subscription = new Subscription();
  idPlanSel: number;
  asigIdPlan: boolean = false;
  formularioGroup: FormGroup;

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
      this.planesServ.traerPlaniGetDate().subscribe(
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


  // registrarAli() {
  //   const comandoAli: ComandoAli = {
  //     idPlan: this.idPlanSel,
  //     fechaAlimentacion: this.formularioGroup.value.fechaAlimentacion,
  //     toneladasDispensadas: this.formularioGroup.value.toneladasDispensadas
  //   };
  //   this.subscription.add(
  //     this.planesServ.registrarAli(comandoAli).subscribe({
  //       next: (respuesta) => {
  //         if (respuesta) {
  //           Swal.fire({
  //             title: 'Alimentacion registrada con éxito',
  //             icon: 'success',
  //             confirmButtonText: 'Ok',
  //           }).then(() => {
  //             this.limpiarForm();
  //           });
  //         } else {
  //           Swal.fire({
  //             title: 'No se pudo registrar la alimentacion',
  //             icon: 'error',
  //             confirmButtonText: 'Ok',
  //           })
  //           alert('No se pudo registrar la alimentacion');
  //         }
  //       },
  //       error: (err: any) => {
  //         console.error(err);
  //         alert('Error al registrar alimentación');
  //       }
  //     })
  //   );
  // }

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

  registrarAli() {
    if (this.formularioGroup.valid) {
      const comandoAli: ComandoAli = {
            idPlan: this.idPlanSel,
            fechaAlimentacion: this.formularioGroup.value.fechaAlimentacion,
            toneladasDispensadas: this.formularioGroup.value.toneladasDispensadas
          };
      this.subscription.add(
        this.planesServ.registrarAli(comandoAli).subscribe({
          next: (respuesta) => {
            if (respuesta.ok) {
              Swal.fire({
                title: 'Alimentacion registrada con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
                this.getPlanesAli();
                //this.cargarListado();

              });
            } else {
              Swal.fire({
                title: respuesta.error,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
              this.limpiarForm();
            }
          },
          error: (err: any) => {
            //console.error(err);
            Swal.fire({
              title: 'Error al registrar la alimentación',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        })
      )
    }

  }
}
