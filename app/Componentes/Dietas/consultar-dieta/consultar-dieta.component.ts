import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  public formulario : FormGroup = new FormGroup({});
  filtroDietas: string = '' ;

  dietas: Dieta[] = [];
  private subscription = new Subscription();
  
  constructor(private dietaService: DietaService) { }
  

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
  
}
