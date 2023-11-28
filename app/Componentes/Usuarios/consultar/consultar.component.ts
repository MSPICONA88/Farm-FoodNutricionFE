import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/Usuario/Usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent {
  @Input() id: string = '';

  listaUsuarios: any = [];
  users: any[];
  filterUsuarios: string = '';
  private subscription = new Subscription();
  page:number;


  constructor(
    private userService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // refreshList() {
  //   this.subscription.add(
  //     this.userService.getAllUsers().subscribe({

  //       next: (respuesta: Usuario[]) => {
  //         this.users = respuesta;
  //       },
  //       error: () => {
  //         Swal.fire({
  //           title: 'Error al comunicarse con la API',
  //           icon: 'error',
  //           confirmButtonText: "Ok",
  //         });
  //       },
  //     }),
  //   );
  // }

  cargarUsuarios() {
    this.subscription.add(
      this.userService.getAllUsers().subscribe(
        (data) => {
          if (data.ok) {
            this.listaUsuarios = data.listaUsuarios;
            this.users = data.listaUsuarios;
            //alert(this.listaUsuarios[0].rol)
          }
          else {
            Swal.fire({
              title: 'Error al obtener el listado de usuarios',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }

}
