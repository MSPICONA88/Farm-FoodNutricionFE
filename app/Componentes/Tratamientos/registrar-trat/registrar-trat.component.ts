import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TratamientoPorAnimal } from 'src/app/Interfaces/tratamientoPorAnimal';
import { AltaTratamientoService } from 'src/app/Services/Tratamiento/AltaTratamiento/alta-tratamiento.service';
import { TiposTratamientoService } from 'src/app/Services/Tratamiento/Tipos/tipos-tratamiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-trat',
  templateUrl: './registrar-trat.component.html',
  styleUrls: ['./registrar-trat.component.css']
})
export class RegistrarTratComponent {
  formularioGroup: FormGroup;
  tratPorAnimal: TratamientoPorAnimal = new TratamientoPorAnimal();
  listaTiposTrat: any = [];

  selectedOption: string;
  idLabel: string;

  private subscription = new Subscription();

  constructor(

    private tratService: AltaTratamientoService,
    private tipoTratService: TiposTratamientoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    
  }

  ngOnInit(): void {

    this.cargarTiposTrat();
    
    this.formularioGroup = this.formBuilder.group({
      Id: ['', Validators.required],
      idTipoTrat: ['', Validators.required],
      medicacion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: [Validators.required]
    })

    this.tratPorAnimal = new TratamientoPorAnimal();

    // onOptionSelected(option: string) {
    //   this.selectedOption = option;
    //   this.idLabel = option === 'lote' ? 'ID Lote' : 'ID Animal';
    // }
  }
    cargarTiposTrat(){
      this.subscription.add(
        this.tipoTratService.getTiposTratamiento().subscribe((data) => {
          if (data.ok) {
            this.listaTiposTrat = data.listaTiposTrat;
            //alert(this.listaRoles[0].nombreRol)
          }

          else {
            Swal.fire({
              title: 'Error al obtener el listado de Tipos de Tratamientos',
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
        this.tratPorAnimal.id_animal = this.formularioGroup.value.Id;
        this.tratPorAnimal.id_tipo_trat = this.formularioGroup.value.idTipoTrat;
        this.tratPorAnimal.medicacion = this.formularioGroup.value.medicacion;
        this.tratPorAnimal.fecha_inicio = this.formularioGroup.value.fechaInicio;
        this.tratPorAnimal.fecha_fin = this.formularioGroup.value.fechaFin;
  
        this.subscription.add(
          this.tratService.postCreate(this.tratPorAnimal).subscribe({
            next: (respuesta: TratamientoPorAnimal) => {
              if (respuesta.ok) {
                Swal.fire({
                  title: 'Tratamiento cargado con éxito',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                }).then(() => {
                  this.limpiarForm();
                });
              } else {
                alert('No se pudo crear el tratamiento por animal');
              }
            },
            error: (err: any) => {
              console.error(err);
              alert('Error al crear el tratamiento');
            }
          })
        );
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
  
    get controlId() : FormControl{
      return this.formularioGroup.controls['Id'] as FormControl
    }
  
    get controlIdTipoTrat() : FormControl{
      return this.formularioGroup.controls['idTipoTrat'] as FormControl
    }
  
    get controlPassword() : FormControl{
      return this.formularioGroup.controls['password'] as FormControl
    }
  
    get controlEmail() : FormControl{
      return this.formularioGroup.controls['email'] as FormControl
    }
  
    get controlRol() : FormControl{
      return this.formularioGroup.controls['idRol'] as FormControl
    }

  }
