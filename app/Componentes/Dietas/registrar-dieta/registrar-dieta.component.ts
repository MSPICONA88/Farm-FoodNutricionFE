import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alimento } from 'src/app/Interfaces/alimento';
import { ComandoDetalleDieta } from 'src/app/Interfaces/comandoDetalleDieta';
import { ComandoDieta } from 'src/app/Interfaces/comandoDieta';
import { Dieta } from 'src/app/Interfaces/dieta';
import { Especie } from 'src/app/Interfaces/especie';
import { AlimentoService } from 'src/app/Services/Alimento/alimento.service';
import { DietaService } from 'src/app/Services/Dieta/dieta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-dieta',
  templateUrl: './registrar-dieta.component.html',
  styleUrls: ['./registrar-dieta.component.css']
})
// export class RegistrarDietaComponent {



//   selectedItem = {} as Alimento;
//   formularioGroup: FormGroup;
//   detallesDieta: ComandoDetalleDieta[] = [];
//   alimento = {} as Alimento;
//   nombreAlimentoSel: string;
//   detallesDietaArray: ComandoDetalleDieta[] = [];
//   verSeleccion: number;
//   elementosSeleccionados: any[] = [];
//   alimentoSeleccionado: number;
//   porcentaje: number;
//   listaAlimentos: Alimento[] = []; // Supongamos que tienes una lista de alimentos disponibles
//   listaAlimentosSel: ComandoDetalleDieta[] = [];
//   detalle = {} as ComandoDetalleDieta;
//   idDieta: null;
//   router: any;
//   //i: number;

//   constructor(
//     private formBuilder: FormBuilder,
//     private dietaService: DietaService,
//     private alimentoService: AlimentoService
//   ) {
//     this.formularioGroup = this.formBuilder.group({
//       nombreDieta: ['', Validators.required],
//       fechaCreacion: ['', Validators.required],
//       observacion: '',
//       alimento: ['', Validators.required],
//       porcentaje: ['', Validators.required]
//       // detallesDieta: this.formBuilder.array([])
//     });

//   }

//   ngOnInit(): void {
//     this.getAlimentos();
//   }

//   // agregarDetalle() {
//   //   const detalle = {
//   //     idAlimento: this.idAlimentoSel,
//   //     nombreAlimento: this.listaAlimentos.find(alimento => alimento.id_alimento === this.idAlimentoSel)?.nombreAlimento,
//   //     porcentaje: null
//   //   };
//   //   this.detallesDietaArray.push(detalle);

//   // }

//   onSelection(ali: Alimento) {
//     //this.selectedItem = ali;
//     this.selectedItem.idAlimento = ali.idAlimento;
//     // this.selectedItem.porcentaje= ali.porcentaje;
//     //console.log(this.selectedItem.porcentaje)
//     this.selectedItem.nombreAlimento = ali.nombreAlimento;
//     this.listaAlimentosSel.push(this.selectedItem);
//     console.log(this.listaAlimentosSel)
//   }

//   // insertarDetalle(item: ComandoDetalleDieta, porcentajeF: number, index: number) {
//   //   //const index = this.listaAlimentosSel.indexOf(item);
//   //   const comandoDetDieta: ComandoDetalleDieta = {
//   //     idAlimento: item.idAlimento,
//   //     porcentaje: porcentajeF
//   //   }
//   //   this.detallesDietaArray.push(comandoDetDieta);
//   //   console.log(this.detallesDietaArray);
//   // }

//   insertarDetalle(item: ComandoDetalleDieta, porcentajeF: number, index: number) {
//     const comandoDetDieta: ComandoDetalleDieta = {
//       idAlimento: item.idAlimento,
//       porcentaje: porcentajeF
//     };

//     this.detallesDietaArray.splice(index, 0, comandoDetDieta);
//     console.log(this.detallesDietaArray);
//   }



//   eliminarDetalle(item: any) {
//     const index = this.listaAlimentosSel.indexOf(item);
//     if (index !== -1) {
//       this.listaAlimentosSel.splice(index, 1);
//     }
//   }

//   guardar(): void {
//     if (this.formularioGroup.valid) {
//       const comandoDieta: ComandoDieta = {
//         nombreDieta: this.formularioGroup.value.nombreDieta,
//         fechaCreacion: this.formularioGroup.value.fechaCreacion,
//         observacion: this.formularioGroup.value.observacion,
//         alimentos: this.detallesDietaArray
//       };

//       this.dietaService.guardarDieta(comandoDieta).subscribe({
//         next: (respuesta) => {
//           if (respuesta.ok) {
//             Swal.fire({
//               title: 'Lote cargado con éxito',
//               icon: 'success',
//               confirmButtonText: 'Ok',
//             }).then(() => {
//               this.limpiarForm();
//             });
//           } else {
//             alert('No se pudo crear el lote');
//           }
//         },
//         error: (err: any) => {
//           console.error(err);
//           alert('Error al crear el lote');
//         }
//       })
//     }
//   }

//   limpiarForm() {
//     this.formularioGroup.reset();
//   }

//   cancelar() {
//     Swal.fire({
//       title: '¿Está seguro que quiere cancelar la operación?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Si',
//       cancelButtonText: 'No'
//     }).then((result) => {
//       this.irAHome();
//     })

//     this.irAHome();
//   }

//   private irAHome() {
//     this.router.navigate(['']);
//   }

//   getAlimentos() {
//     this.alimentoService.getAllAlimentos().subscribe({
//       next: (respuesta) => {
//         this.listaAlimentos = respuesta.listaAlimentos;
//         console.log(respuesta.listaAlimentos); // Agregado para verificar
//       },
//       error: () => {
//         alert('error al comunicarse con la API');
//       },
//     });
//   }


//   get controlNombreDieta(): FormControl {
//     return this.formularioGroup.controls['nombreDieta'] as FormControl
//   }
//   get controlFechaCreacion(): FormControl {
//     return this.formularioGroup.controls['fechaCreacion'] as FormControl
//   }
//   get controlObservacion(): FormControl {
//     return this.formularioGroup.controls['observacion'] as FormControl
//   }
//   get controlAlimento(): FormControl {
//     return this.formularioGroup.controls['alimento'] as FormControl
//   }
//   get controlPorcentaje(): FormControl {
//     return this.formularioGroup.controls['porcentaje'] as FormControl
//   }
// }


export class RegistrarDietaComponent implements OnInit {
  formularioGroup: FormGroup;
  listaAlimentos: Alimento[] = [];
  listaAlimentosSel: ComandoDetalleDieta[] = [];
  router: any;
  private subscription=new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private dietaService: DietaService,
    private alimentoService: AlimentoService
  ) {
    this.formularioGroup = this.formBuilder.group({
      nombreDieta: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      observacion: '',
      detallesDieta: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getAlimentos();
  }

  get detallesDietaArray(): FormArray {
    return this.formularioGroup.get('detallesDieta') as FormArray;
  }

  agregarDetalle(): void {
    this.detallesDietaArray.push(this.createDetalleGroup());
  }

  createDetalleGroup(): FormGroup {
    return this.formBuilder.group({
      idAlimento: ['', Validators.required],
      porcentaje: ['', Validators.required]
    });
  }

  eliminarDetalle(index: number): void {
    this.detallesDietaArray.removeAt(index);
  }

  guardar(): void {
    if (this.formularioGroup.invalid) {
      return;
    }

    const comandoDieta: ComandoDieta = {
      nombreDieta: this.formularioGroup.value.nombreDieta,
      fechaCreacion: this.formularioGroup.value.fechaCreacion,
      observacion: this.formularioGroup.value.observacion,
      alimentos: this.formularioGroup.value.detallesDieta
    };

    this.subscription.add(
      this.dietaService.guardarDieta(comandoDieta).subscribe({
        next: (respuesta: any) => {
          if (respuesta.ok) {
            Swal.fire({
              title: 'Dieta creada con éxito',
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then(() => {
              this.limpiarForm();
            });
          }
          else {
            Swal.fire({
              title: respuesta.error,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        },
        error: (error: any) => {
          console.error(error);
          alert('Error al crear la dieta');
        }
      })
    )
  }
  



  limpiarForm(): void {
    this.formularioGroup.reset();
    this.detallesDietaArray.clear();
  }

  cancelar(): void {
    Swal.fire({
      title: '¿Está seguro que desea cancelar la operación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.irAHome();
      }
    });
  }

  irAHome(): void {
    this.router.navigate(['']);
  }

  getAlimentos(): void {
    this.alimentoService.getAllAlimentos().subscribe(
      (respuesta: any) => {
        this.listaAlimentos = respuesta.listaAlimentos;
        console.log(respuesta.listaAlimentos);
      },
      (error: any) => {
        alert('Error al comunicarse con la API');
      }
    );
  }
}
