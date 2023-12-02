import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EspecieService } from 'src/app/Services/Lote/Especie/especie.service';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-card-peso-list',
  templateUrl: './card-peso-list.component.html',
  styleUrls: ['./card-peso-list.component.css']
})
export class CardPesoListComponent {
  cantTotalAnimales: number;
  pesoTotalIngreso: number;
  pesoPromAnimal: number;
  reporteCard: any;
  formularioGroup: FormGroup;
  listaEspecies: any = [];
  idEspecie: number;
  listaLotes: any = [];
  page: number;
  
  pesoActualAprox: number;
  
  private subscription = new Subscription();

  constructor(
    private especieService: EspecieService,
    private loteService: LoteService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    
    //this.cargarListadoRaza();
    this.formularioGroup = this.formBuilder.group({
      especie: ['', [Validators.required]],
    });
    this.getEspecies();
    this.getIdEspecie();
    this.cargarCardsInit();
    


  }


  getEspecies() {
    this.especieService.getAllEspecies().subscribe({
      next: (respuesta) => {
        this.listaEspecies = [''].concat(respuesta.listaEspecies);
        // this.listaEspecies = respuesta.listaEspecies; //anterior
        // console.log(respuesta.listaEspecies); // Agregado para verificar
      },
      error: () => {
        alert('error al comunicarse con la API Especies');
      },
    });
  }
  

  getIdEspecie() {
    this.formularioGroup?.get('especie')?.valueChanges.subscribe((x: number) => {
      if (x) { // Verificar si el valor de especie es válido
        this.idEspecie = x,
          console.log(this.idEspecie);
        this.cargarCardsUpdate(this.idEspecie);
        this.cargarListadoLotes(this.idEspecie);
      }
    })
  }


  cargarListadoLotes(idEspecie: number) {
    
    this.subscription.add(
      this.loteService.getLotesPorEspecie(idEspecie.toString()).subscribe(
        (data) => {
          if (data!=null) {
            this.listaLotes = data.listaLotesPorEspecie;
            // this.pesoActualAprox= (this.listaLotes.pesoPromAnimal*this.listaLotes.cantidadActual)
            // console.log(this.listaLotes)
          }
          else {
            Swal.fire({
              title: 'Error al obtener el listado de lotes',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }

  cargarCardsUpdate(idEspecie: number){
    this.especieService.reportEspecieId(idEspecie).subscribe({
      next: (respuesta) => {
        this.cantTotalAnimales = respuesta.cantidadActual;
        this.pesoTotalIngreso = respuesta.pesoIngreso;
        this.pesoPromAnimal=respuesta.pesoPromedio ;
        this.pesoActualAprox= respuesta.pesoActualAprox;
      },
      error: () => {
        alert('error al comunicarse con la API EspeciesReportes');
      },
    });
  }

  cargarCardsInit(){
    this.especieService.reportEspecieAll().subscribe({
      next: (respuesta) => {
        this.cantTotalAnimales = respuesta.cantidadActual; 
        this.pesoTotalIngreso = respuesta.pesoIngreso;
        this.pesoPromAnimal=respuesta.pesoPromedio;
        this.pesoActualAprox= respuesta.pesoActualAprox;
        // this.listaEspecies = respuesta.listaEspecies; //anterior
        // console.log(respuesta.listaEspecies); // Agregado para verificar
      },
      error: () => {
        alert('error al comunicarse con la API EspeciesReportes');
      },
    });
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

  
  get controlEspecie(): FormControl {
    return this.formularioGroup.controls['especie'] as FormControl
  }


  // createPdf(){

  //   const pdfDefinition: any{
  //     content: [
  //       {
  //         text:''
  //       }
  //     ]
  //   }
  // }
}


