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

export class RegistrarDietaComponent implements OnInit {
  formularioGroup: FormGroup;
  listaAlimentos: Alimento[] = [];
  listaAlimentosSel: ComandoDetalleDieta[] = [];
  
  private subscription=new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private dietaService: DietaService,
    private alimentoService: AlimentoService,
    private router:Router
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
  

  crearAlimento(){
    this.router.navigate(['alimentos']);
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

