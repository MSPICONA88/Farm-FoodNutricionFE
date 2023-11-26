import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Especie } from 'src/app/Interfaces/especie';
import { Lote } from 'src/app/Interfaces/Lote';
import { Raza } from 'src/app/Interfaces/raza';
import { EspecieService } from 'src/app/Services/Lote/Especie/especie.service';
import { FinalidadService } from 'src/app/Services/Lote/Finalidad/finalidad.service';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import { RazaService } from 'src/app/Services/Lote/Raza/raza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-lotes',
  templateUrl: './registrar-lotes.component.html',
  styleUrls: ['./registrar-lotes.component.css']
})
export class RegistrarLotesComponent {
  formularioGroup: FormGroup;
  especie: Especie = new Especie();
  raza: Raza = new Raza();
  lote: Lote = new Lote();
  listaEspecies: any = [];
  listaRazas: any = [];
  listaFinalidades: any = [];
  idEspecie: number;
  nombreEspecieInvalid: boolean = false;

  private subscription = new Subscription();

  constructor(

    private especieService: EspecieService,
    private razaService: RazaService,
    private finalidadService: FinalidadService,
    private loteService: LoteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

    //this.cargarListadoRaza();


    this.formularioGroup = this.formBuilder.group({
      //fechaIngreso: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      pesoTotal: ['', [Validators.required]],
      finalidad: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edadMeses: ['', [Validators.required]]
    });

    this.cargarListadoFinalidad();
    this.getEspecies();
    this.getRazasPorEspecie();

  }

  getEspecies() {
    this.especieService.getAllEspecies().subscribe({
      next: (respuesta) => {
        this.listaEspecies = respuesta.listaEspecies;
        console.log(respuesta.listaEspecies); // Agregado para verificar
      },
      error: () => {
        alert('error al comunicarse con la API Especies');
      },
    });
  }

  // getRazasPorEspecie(){
  //   this.formularioGroup?.get('especie')?.valueChanges.subscribe((x: number) => {
  //     // console.log('especie value changed')
  //     // console.log(x)
  //     // console.log(this.formularioGroup.get('especie')?.value)
  //     // console.log(this.controlEspecie.getRawValue())
  //     // const especieValue = this.formularioGroup.value.especie.id_especie
  //     // console.log(especieValue.nombreEspecie)

  //     this.subscription.add(
  //       this.razaService.getRazasPorEspecie(x).subscribe({

  //         next: (respuesta) => {
  //           this.listaRazas = respuesta.listaRazasPorEspecie;
  //         },
  //         error: () => {
  //           alert('error al comunicarse con la API razas');
  //         },
  //       }),
  //     );
  //   });
  // }

  getRazasPorEspecie() {
    this.formularioGroup?.get('especie')?.valueChanges.subscribe((x: number) => {
      if (x) { // Verificar si el valor de especie es válido
        this.subscription.add(
          this.razaService.getRazasPorEspecie(x).subscribe({
            next: (respuesta) => {
              this.listaRazas = respuesta.listaRazasPorEspecie;
            },
            error: () => {
              alert('error al comunicarse con la API razas');
            },
          }),
        );
      }
    });
  }
  
  cargarListadoFinalidad() {
    this.subscription.add(
      this.finalidadService.getAllFinalidades().subscribe((data) => {
        if (data.ok) {
          this.listaFinalidades = data.listaFinalidades;
          //alert(this.listaFinalidades[0].nombreFinalidad)
        }
        else {
          Swal.fire({
            title: 'Error al obtener el listado de finalidades',
            icon: 'error',
            confirmButtonText: "Ok"
          });
        }
      }
      )
    );
  }








  guardar() {
    if (this.formularioGroup.valid) {
      this.lote.cantidadAnimales = this.formularioGroup.value.cantidad;
      this.lote.pesoIngreso = this.formularioGroup.value.pesoTotal;
      this.lote.idFinalidad = this.formularioGroup.value.finalidad;
      this.lote.idRaza = this.formularioGroup.value.raza;
      this.lote.edadMeses = this.formularioGroup.value.edadMeses;

      this.subscription.add(
        this.loteService.postCreate(this.lote).subscribe({
          next: (respuesta) => {
            if (respuesta.ok) {
              Swal.fire({
                title: 'Lote cargado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
              });
            } else {
              // alert('No se pudo crear el lote');
              Swal.fire({
                title: respuesta.error,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          },
          error: (err: any) => {
            console.error(err);
            // alert('Error al crear el lote');
            Swal.fire({
              title: 'Error al registrar el lote',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        })
      )
    }
  }

  limpiarForm() {
    this.formularioGroup.reset();
  }





  cancelar() {
    Swal.fire({
      title: '¿Está seguro que quiere cancelar la operación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      this.irAHome();
    })

    this.irAHome();
  }

  private irAHome() {
    this.router.navigate(['']);
  }

  get controlFecha(): FormControl {
    return this.formularioGroup.controls['fechaIngreso'] as FormControl
  }
  get controlCantidad(): FormControl {
    return this.formularioGroup.controls['cantidad'] as FormControl
  }
  get controlPeso(): FormControl {
    return this.formularioGroup.controls['pesoTotal'] as FormControl
  }
  get controlFinalidad(): FormControl {
    return this.formularioGroup.controls['finalidad'] as FormControl
  }
  get controlEspecie(): FormControl {
    return this.formularioGroup.controls['especie'] as FormControl
  }
  get controlRaza(): FormControl {
    return this.formularioGroup.controls['raza'] as FormControl
  }


}
