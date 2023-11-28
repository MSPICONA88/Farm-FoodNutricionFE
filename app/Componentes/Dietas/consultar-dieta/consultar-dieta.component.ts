import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dieta } from 'src/app/Interfaces/dieta';
import { DietaService } from 'src/app/Services/Dieta/dieta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-dieta',
  templateUrl: './consultar-dieta.component.html',
  styleUrls: ['./consultar-dieta.component.css']
})
export class ConsultarDietaComponent {

  public formulario: FormGroup = new FormGroup({});
  filtroDietas: string = '';
  page: number;
  dietas: Dieta[] = [];
  private subscription = new Subscription();

  constructor(
    private dietaService: DietaService,
    private router: Router) { }


  ngOnInit(): void {
    this.getDietasConAlimentos();
  }

  // getDietasConAlimentos(): void {
  //   this.dietaService.getAllDietasDet().subscribe(
  //     dietas => this.dietas = dietas,
  //     error => console.error(error)
  //   );
  // }

  

  getDietasConAlimentos() {
    this.subscription.add(
      this.dietaService.getAllDietasDet().subscribe(
        (data) => {
          if (data.ok) {
            this.dietas = data.listaDietas;
            //alert(this.listaFinalidades[0].nombreFinalidad)
          } else {
            Swal.fire({
              title: 'Error al obtener el listado de dietas',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        })
    );
  }

  deleteDieta(idDieta: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Eliminar dieta",
      text: "¿Está seguro que desea eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dietaService.deleteDieta(idDieta).subscribe({
          next: (data) => {
            if (data.ok) {
              swalWithBootstrapButtons.fire({
                title: "Eliminar dieta",
                text: "La dieta " + data.idDieta + " ha sido eliminada",
                icon: "success"
              });
              this.getDietasConAlimentos();
            }
            else {
              swalWithBootstrapButtons.fire({
                title: "Eliminar dieta",
                text: data.error,
                icon: "error"
              });
            }

          },
          error: () => {
            swalWithBootstrapButtons.fire({
              title: "Eliminar dieta",
              text: "La dieta no pudo ser eliminada",
              icon: "error"
            });
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Eliminar dieta",
          text: "La transacción ha sido cancelada",
          icon: "error"
        });
      }
    });




    // if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    //   this.usuarioService.deleteUsuario(id).subscribe({
    //     next: (data) => {
    //       alert(data.mensaje);
    //       this.traerListaUsuarios();
    //     },
    //     error: () => {
    //       alert('Error al eliminar el usuario');
    //     }
    //   });
    // }
  }

  verificarUsoDieta(idDieta: number): void {
    this.dietaService.verificarUsoDieta(idDieta).subscribe(result => {
      if (result) {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: "La dieta no puede ser editada ya que ha sido utilizada en un plan de alimentación.",
          confirmButtonText: "Ok"
        });

      } else {
        this.router.navigate(['/modificardieta', idDieta]);;
      }
    });
  }



}
