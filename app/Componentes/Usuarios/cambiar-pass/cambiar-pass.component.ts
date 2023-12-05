import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComandoPassword } from 'src/app/Interfaces/comandoPassword';
import { LoginService } from 'src/app/Services/Usuario/Login/login.service';
import { UsuarioService } from 'src/app/Services/Usuario/Usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent {

  formularioGroup: FormGroup;
  password: ComandoPassword;
  idUsuario: number;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private loginServ: LoginService
  ) {
    
  }

  ngOnInit(): void {

    
    this.formularioGroup = this.formBuilder.group({
      contrasenaActual: ['', Validators.required],
      nuevaContrasena: ['', Validators.required],
      repetirNuevaContrasena: ['', Validators.required]
    })


  }
    traerId(){
      this.idUsuario=this.userService.getToken();
    }

    guardar() {
      if (this.formularioGroup.valid) {
        this.traerId();
        this.password= this.formularioGroup.value;
        this.subscription.add(
          this.userService.updatePass(this.idUsuario, this.password).subscribe({
            next: (respuesta: any) => {
              if (respuesta.ok) {
                Swal.fire({
                  title: 'Contraseña modificada con éxito',
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
                title: 'Error al cambiar la contraseña',
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
  
    
  
    get controlPassActual() : FormControl{
      return this.formularioGroup.controls['contrasenaActual'] as FormControl
    }
  
    get controlPassNueva() : FormControl{
      return this.formularioGroup.controls['nuevaContrasena'] as FormControl
    }
  
    get controlRepetirPassNueva() : FormControl{
      return this.formularioGroup.controls['repetirNuevaContrasena'] as FormControl
    }

}
