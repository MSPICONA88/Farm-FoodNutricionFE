import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComandoDetalleDieta } from 'src/app/Interfaces/comandoDetalleDieta';
import { ComandoDieta } from 'src/app/Interfaces/comandoDieta';
import { AlimentoService } from 'src/app/Services/Alimento/alimento.service';
import { DietaService } from 'src/app/Services/Dieta/dieta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-dieta',
  templateUrl: './modificar-dieta.component.html',
  styleUrls: ['./modificar-dieta.component.css']
})
export class ModificarDietaComponent {
  dietaForm: FormGroup;
  idDieta: number;
  private subscription = new Subscription();
  detalle = {} as ComandoDetalleDieta;
  porcentaje: number;
  listaAlimentos: any[]; // Agregar propiedad listaAlimentos

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dietaService: DietaService,
    private alimentoService: AlimentoService
  ) { }

  ngOnInit(): void {
    this.idDieta = this.route.snapshot.params['idDieta'];

    this.dietaForm = this.formBuilder.group({
      idDieta: [''],
      nombreDieta: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      observacion: [''],
      alimentos: this.formBuilder.array([])
    });

    this.getDieta();
    this.getAlimentos();
  }

  get alimentosFormArray(): FormArray {
    return this.dietaForm.get('alimentos') as FormArray;
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

  agregarAlimento(): void{

    //funciona:
    const alimentosFormArray = this.dietaForm.get('alimentos') as FormArray;
    alimentosFormArray.push(this.crearFormGroupAlimento()); 
    console.log(alimentosFormArray)
    
    

    //nuevo:
    // const nuevoAlimento = this.crearFormGroupAlimento();
    // const alimentoSeleccionado = this.listaAlimentos.find(alimento => alimento.idAlimento === nuevoAlimento.value.idAlimento);
    //   if (alimentoSeleccionado) {
    //   nuevoAlimento.patchValue({
    //     nombreAlimento: alimentoSeleccionado.nombreAlimento
    //   });
    //   this.alimentosFormArray.push(nuevoAlimento);
    // }
  }


  eliminarDetalle(index: number): void {
    const alimentosFormArray = this.dietaForm.get('alimentos') as FormArray;
    alimentosFormArray.removeAt(index);
  }

  crearFormGroupAlimento(): FormGroup {
    return this.formBuilder.group({
      idAlimento: [''],
      nombreAlimento: [''],
      porcentaje: ['']
    });
  }

  getDieta(): void {
    this.subscription.add(
      this.dietaService.getDieta(this.idDieta).subscribe(
        (data: any) => {
          const alimentosFormArray = this.dietaForm.get('alimentos') as FormArray;
          alimentosFormArray.clear(); // Elimina los controles existentes antes de agregar nuevos
          
          data.alimentos.forEach((alimento: any) => {
            alimentosFormArray.push(
              this.formBuilder.group({
                idAlimento: [alimento.idAlimento],
                nombreAlimento: [alimento.nombreAlimento],
                porcentaje: [alimento.porcentaje]
              })
            );
          });
  
          this.dietaForm.patchValue({
            nombreDieta: data.nombreDieta,
            fechaCreacion: data.fechaCreacion,
            observacion: data.observacion
          });
        },
        (error: any) => {
          console.error(error);
        })
    );
  }
  
  actualizarDetalles(detalles: any[]): void {
    const alimentosFormArray = this.dietaForm.get('alimentos') as FormArray;
  
    detalles.forEach((detalle, index) => {
      const formulario = alimentosFormArray.at(index) as FormGroup;
      formulario.patchValue(detalle);
    });
  }
  

  guardar(): void {
    // Obtén los valores actuales del FormArray
  const detalles = (this.dietaForm.get('alimentos') as FormArray).value;

  // Llama a la función para actualizar los detalles del formulario
  // Transforma los datos antes de enviar a la API
  const alimentosSinNombre = detalles.map((alimento: any) => {
    return {
      idAlimento: alimento.idAlimento,
      porcentaje: alimento.porcentaje
    };
  });
  
    const formData = { ...this.dietaForm.value }; // Clonar los datos del formulario
  
    const dietaDetalleDTO: ComandoDieta = {
      idDieta: this.idDieta,
      nombreDieta: formData.nombreDieta,
      fechaCreacion: formData.fechaCreacion,
      observacion: formData.observacion,
      alimentos: alimentosSinNombre
    };
  
    this.dietaService.updateDieta(this.idDieta, dietaDetalleDTO).subscribe(
      (data: any) => {
        console.log(data); // Opcional: muestra un mensaje de éxito
        if (data.ok == true) {
          Swal.fire({
            title:'Dieta modificada con éxito',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.router.navigate(['main/consultarDietas'])
          });
          // this.router.navigate(['main/consultarDietas']); // Redirige a la lista de dietas  
        } 
        // else {
        //   const errorMessage = data.HttpErrorResponse || 'Error al modificar la dieta';
        //   // alert(errorMessage);
        //   Swal.fire({
        //     title:errorMessage,
        //     icon: 'error',
        //     confirmButtonText: 'Ok',
        //   });
        // }
      },
      (error: any) => {
        Swal.fire({
          title:error.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        console.error(error);
      }
    );
  }
  
  

  insertarDetalle(item: ComandoDetalleDieta, porcentajeF: number, index: number){

  }

  

  

  


}


 // getDieta(): void {
  //   this.subscription.add(
  //     this.dietaService.getDieta(this.idDieta).subscribe(
  //       (data: any) => {
  //         this.dietaForm.patchValue({
  //           nombreDieta: data.nombreDieta,
  //           fechaCreacion: data.fechaCreacion,
  //           observacion: data.observacion
  //         });

  //         const alimentosFormArray = this.dietaForm.get('alimentos') as FormArray;
  //         data.alimentos.forEach((alimento: any) => {
  //           alimentosFormArray.push(
  //             this.formBuilder.group({
  //               nombreAlimento: [''],
  //               porcentaje: ['']
  //             })
  //           );
  //         });
  //       },
  //       (error: any) => {
  //         console.error(error);
  //       })
  //   );
  // }

  // getDieta(): void {
  //   this.subscription.add(
  //     this.dietaService.getDieta(this.idDieta).subscribe(
  //       (data: any) => {
  //         const alimentosFormArray = this.dietaForm.get('alimentos') as FormArray;
  //         data.alimentos.forEach((alimento: any) => {
  //           alimentosFormArray.push(
  //             this.formBuilder.group({
  //               nombreAlimento: [alimento.nombreAlimento],
  //               porcentaje: [alimento.porcentaje]
  //             })
  //           );
  //         });
  
  //         this.dietaForm.patchValue({
  //           nombreDieta: data.nombreDieta,
  //           fechaCreacion: data.fechaCreacion,
  //           observacion: data.observacion
  //         });
  //       },
  //       (error: any) => {
  //         console.error(error);
  //       })
  //   );
  // }