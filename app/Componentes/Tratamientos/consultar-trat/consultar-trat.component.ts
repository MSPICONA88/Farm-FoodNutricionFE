import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsultaTratamientoService } from 'src/app/Services/Tratamiento/ConsultaTratamiento/consulta-tratamiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-trat',
  templateUrl: './consultar-trat.component.html',
  styleUrls: ['./consultar-trat.component.css']
})
export class ConsultarTratComponent {

  fechaInicio: string;
  fechaFin: string;
  listaTratamientos: any=[];
  buscador: boolean=false;
  filtroTrat: string = '' ;
  

  constructor(
    private tratService: ConsultaTratamientoService,
    private router: Router) { }
    private subscription = new Subscription();
  ngOnInit(): void {
    this.cargarTratamientos();
  }

  cargarTratamientos(){
    this.subscription.add(
      this.tratService.getAllTratamientos().subscribe(
        (data) => {
          if (data.ok) {
            this.listaTratamientos = data.listaTratatamientos;
            console.log(this.listaTratamientos.especie)
          }
          else {
            Swal.fire({
              title: data.error,
              icon: 'warning',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }




  cargarTratamientosPorFecha() {
    this.buscador=true;
    this.subscription.add(
      this.tratService.tratPorFecha(this.fechaInicio, this.fechaFin).subscribe(
        (data) => {
          if (data.ok) {
            this.listaTratamientos = data.listaTratatamientosPorFecha;
            console.log(this.listaTratamientos.especie)
          }
          else {
            Swal.fire({
              title: data.error,
              icon: 'warning',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }

  formatFechaIngreso(fechaIngreso: string): string {
    // Convertir la cadena a un objeto Date
    const dateObject = new Date(fechaIngreso);

    // Obtener los componentes de la fecha
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Los meses comienzan desde 0
    const year = dateObject.getFullYear();

    // Formatear la fecha en el formato deseado
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

    return formattedDate;
  }

  
}
