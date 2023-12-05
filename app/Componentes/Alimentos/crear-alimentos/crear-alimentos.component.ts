import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alimento } from 'src/app/Interfaces/alimento';
import { AlimentoService } from 'src/app/Services/Alimento/alimento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-alimentos',
  templateUrl: './crear-alimentos.component.html',
  styleUrls: ['./crear-alimentos.component.css']
})
export class CreaAlimentosComponent {
  formularioGroup: FormGroup;
  alimento: Alimento = new Alimento();
  listaAlimentos: any = [];
  nombreAlimento: string;
  nombreAlimentoInvalid: boolean = false;

  private subscription = new Subscription();


  constructor(

    private aliService: AlimentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.cargarListado();

    this.formularioGroup = this.formBuilder.group({
      nombreAlimento: ['', [Validators.required]],

    })

    this.alimento = new Alimento();

  }




  guardar2() {
    if (this.formularioGroup.valid) {
      this.alimento.nombreAlimento = this.formularioGroup.value.nombreAlimento;
      this.subscription.add(
        this.aliService.crearAlimento2(this.alimento.nombreAlimento).subscribe({
          next: (respuesta: Alimento) => {
            if (respuesta.ok) {
              Swal.fire({
                title: 'Alimento cargado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
                this.cargarListado();

              });
            }
            else {
              Swal.fire({
                title: respuesta.error,
                icon: 'error',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
              });
            }
          },
          error: (err: any) => {
            //console.error(err);
            Swal.fire({
              title: 'Error al crear el alimento',
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

  limpiar() {
  
      this.limpiarForm();
    
    
  }

  private irAHome() {
    this.router.navigate(['main/home']);
  }

  get controlNombre(): FormControl {
    return this.formularioGroup.controls['nombreAlimento'] as FormControl
  }

  cancelarCarga() {

  }

  cargarListado() {
    this.subscription.add(
      this.aliService.getAllAlimentos().subscribe(
        (data) => {
          if (data.ok) {
            this.listaAlimentos = data.listaAlimentos;
            //this.users = data.listaUsuarios;
            //alert(this.listaUsuarios[0].rol)
          }
          else {
            Swal.fire({
              title: 'Error al obtener el listado de alimentos',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }

}




