import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComandoRoles } from 'src/app/Interfaces/comandoRoles';
import { ComandoUsuario } from 'src/app/Interfaces/comandoUsuario';
import { Rol } from 'src/app/Interfaces/rol';
import { Usuario } from 'src/app/Interfaces/usuario';
import { RolService } from 'src/app/Services/Usuario/Rol/rol.service';
import { UsuarioService } from 'src/app/Services/Usuario/Usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  formularioGroup: FormGroup;
  usuario: ComandoUsuario = new ComandoUsuario();
  listaRoles: any = [];
  
  private subscription = new Subscription();
  roles: Rol[];

  constructor(
    
    private userService: UsuarioService,
    private rolService: RolService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.cargarRoles();
  }

  ngOnInit(): void {
    

    this.formularioGroup= this.formBuilder.group({
      nombreApellido: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
      usuario1: ['', [Validators.minLength(3), Validators.maxLength(80), Validators.required]],
      password: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
      idRol: [Validators.required]
    })

    this.usuario = new ComandoUsuario();

    // this.subscription.add(
    //   this.rolService.getAllRoles().subscribe({
    //     next: (listado: Rol[]) => {
    //       this.roles = listado;
    //     },
    //     error: () => {
    //       alert('error al obtener roles');
    //     },
    //   })
    // );

    
  }
  async cargarRoles() {
    this.subscription.add(
      this.rolService.getAllRoles().subscribe((data)=>{
        if(data.ok){
          this.listaRoles=data.listaRoles;
          //alert(this.listaRoles[0].nombreRol)
        }
          
        else{
          Swal.fire({
            title: 'Error al obtener el listado de roles',
            icon: 'error',
            confirmButtonText: "Ok"
          });
        }
      }  
      )      
    );
  }

  // guardar() {
  //   if (this.formularioGroup.valid) {
  //     console.log(this.usuario)
  //     this.subscription.add(
  //       this.userService.postCreate(this.formularioGroup).subscribe({
  //         next: () => {
  //           this.irAHome();
  //         },
  //         error: () => {
  //           alert('error al guardar');
  //         },
  //       })
  //     );
  //   }
  // }

  guardar() {
    if (this.formularioGroup.valid) {
      this.usuario.nombreApellido = this.formularioGroup.value.nombreApellido;
      this.usuario.usuario1 = this.formularioGroup.value.usuario1;
      this.usuario.email = this.formularioGroup.value.email;
      this.usuario.idRol = this.formularioGroup.value.idRol;
      this.usuario.password = this.formularioGroup.value.password;

      this.subscription.add(
        this.userService.postCreate(this.usuario).subscribe({
          next: (respuesta: ComandoUsuario) => {
            if (respuesta.ok) {
              Swal.fire({
                title: 'Usuario cargado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
              });
            } else {
              alert('No se pudo crear el usuario');
            }
          },
          error: (err: any) => {
            console.error(err);
            alert('Error al crear el usuario');
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

  get controlNombre() : FormControl{
    return this.formularioGroup.controls['nombreApellido'] as FormControl
  }

  get controlUsuario() : FormControl{
    return this.formularioGroup.controls['usuario1'] as FormControl
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

