import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComandoPlani } from 'src/app/Interfaces/comandoPlani';
import { Dieta } from 'src/app/Interfaces/dieta';
import { Lote } from 'src/app/Interfaces/Lote';
import { AlimentacionService } from 'src/app/Services/Alimentacion/alimentacion.service';
import { DietaService } from 'src/app/Services/Dieta/dieta.service';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planificar-alimentacion',
  templateUrl: './planificar-alimentacion.component.html',
  styleUrls: ['./planificar-alimentacion.component.css']
})
export class PlanificarAlimentacionComponent {
  formularioGroup: FormGroup;
  fechaInicio: string;
  fechaFin: string;
  listaLotes: any = [];
  hide: boolean = false;
  selectLote = {} as Lote;
  mostrarModificarLote: boolean = false;
  asigDieta: boolean = false;
  dietas: Dieta[] = [];
  idLote: number;
  page: number;
 

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private router: Router,
    private dietaService: DietaService,
    private alimentacionServ: AlimentacionService
    ) { 
      this.cargarLotesDef();
      this.formularioGroup = this.formBuilder.group({
        idDieta: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        cantToneladaDiaria: ['', Validators.required]
        
      });
    }
  private subscription = new Subscription();
  ngOnInit(): void {
   
  }

  cancelarPlani(){
    this.asigDieta=false;
    this.limpiarForm();

  }
  cargarLotes() {
    this.subscription.add(
      this.loteService.lotePorFecha(this.fechaInicio, this.fechaFin).subscribe(
        (data) => {
          if (data.ok) {
            this.listaLotes = data.listaLotesPorFecha;
            console.log(this.listaLotes)
          }
          else {
            Swal.fire({
              title: 'Error al obtener el listado de tratamientos',
              icon: 'error',
              confirmButtonText: "Ok"
            });
          }
        }
      )
    );
  }

  
  modificarLote(lote: Lote) {
    this.hide = true;
    this.selectLote = lote;
  }


  cancelar() {
    this.selectLote = {} as Lote;
    this.hide = false;
    this.cargarLotes();
  }

  traerDietas() {
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

  asignarDieta(id: number) {
    this.asigDieta = true;
    this.traerDietas();
    console.log(id);
    this.idLote=id;
  }


  guardarPlani(){
    const comandoPlani: ComandoPlani = {
      idLote: this.idLote,
      idDieta: this.formularioGroup.value.idDieta,
      fechaInicio: this.formularioGroup.value.fechaInicio,
      fechaFin: this.formularioGroup.value.fechaFin,
      cantToneladaDiaria: this.formularioGroup.value.cantToneladaDiaria
    };

    this.alimentacionServ.guardarPlani(comandoPlani).subscribe(
      (respuesta: any) => {
        if (respuesta.ok) {
          Swal.fire({
            title: 'Plani creada con éxito',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.limpiarForm();
            this.asigDieta=false;
          });
        } else {
          alert('No se pudo crear la dieta');
        }
      },
      (error: any) => {
        console.error(error);
        alert('Error al crear la dieta');
      }
    );
  }

  limpiarForm(): void {
    this.formularioGroup.reset();
    // this.comandoPlani.clear();
  }

  cargarLotesDef() {
    this.subscription.add(
      this.loteService.lotePorFechaDef().subscribe(
        (data) => {
          if (data.ok) {
            this.listaLotes = data.listaLotesPorFecha;
            
            //alert(this.listaUsuarios[0].rol)
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
