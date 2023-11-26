import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lote } from 'src/app/Interfaces/Lote';
import { Especie } from 'src/app/Interfaces/especie';
import { Raza } from 'src/app/Interfaces/raza';
import { EspecieService } from 'src/app/Services/Lote/Especie/especie.service';
import { FinalidadService } from 'src/app/Services/Lote/Finalidad/finalidad.service';
import { RazaService } from 'src/app/Services/Lote/Raza/raza.service';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egresar-lotes',
  templateUrl: './egresar-lotes.component.html',
  styleUrls: ['./egresar-lotes.component.css']
})
export class EgresarLotesComponent {
  formularioGroup: FormGroup;
  especie: Especie = new Especie();
  raza: Raza = new Raza();
  lote: Lote = new Lote();
  lotePorId: any;
  listaEspecies: any = [];
  listaRazas: any = [];
  listaFinalidades: any = [];
  idEspecie: number;
  nombreEspecieInvalid: boolean = false;
  idLote: number;
  //@Input() selectedLote: Lote;
  // @Input() idLote: number;
  private subscription = new Subscription();

  constructor(

    private especieService: EspecieService,
    private razaService: RazaService,
    private finalidadService: FinalidadService,
    private loteService: LoteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formularioGroup = this.formBuilder.group({
      idLote: [],
      fechaIngreso: ['', [Validators.required]],
      cantidadAnimales: ['', [Validators.required]],
      cantidadActual: ['', [Validators.required]],
      pesoIngreso: ['', [Validators.required]],
      idFinalidad: ['', [Validators.required]],
      idEspecie: ['', [Validators.required]],
      idRaza: ['', [Validators.required]],
      edadMeses: ['', [Validators.required]],
      pesoEgreso: ['', [Validators.required]],
      fechaEgreso: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.formularioGroup?.get('fechaIngreso')?.disable();
    this.formularioGroup?.get('cantidadAnimales')?.disable();
    this.formularioGroup?.get('cantidadActual')?.disable();
    this.formularioGroup?.get('pesoIngreso')?.disable();
    this.formularioGroup?.get('idFinalidad')?.disable();
    this.formularioGroup?.get('idEspecie')?.disable();
    this.formularioGroup?.get('idRaza')?.disable();
    this.formularioGroup?.get('edadMeses')?.disable();


    this.cargarListadoFinalidad();
    this.getEspecies();

    this.formularioGroup?.get('idEspecie')?.valueChanges.subscribe((x: number) => {
      if(x!=null)
      this.subscription.add(
        this.razaService.getRazasPorEspecie(x).subscribe({

          next: (respuesta) => {
            this.listaRazas = respuesta.listaRazasPorEspecie;
          },
          error: () => {
            alert('error al comunicarse con la API');
          },
        }),
      );
    });

    

    const id = this.activatedRoute.snapshot.params['idLote'];

    console.log('ID:', id);

    this.subscription.add(
      this.loteService.lotePorId(id.toString()).subscribe({
        next: (respuesta) => {
          console.log('RESPUESTA:', respuesta);
          (this.lotePorId = respuesta)
          if (this.formularioGroup) {
            this.formularioGroup.patchValue(respuesta)
          }

        },
        error: () => Swal.fire({
          title: 'Error al obtener el lote',
          icon: 'error',
          confirmButtonText: "Ok"
        })
      })
    );

    // const id = this.activatedRoute.snapshot.params['idLote'];
    // this.subscription.add(
    //   this.loteService.lotePorId(id).subscribe({
    //     next: (respuesta) => this.formularioGroup.patchValue(respuesta),
    //     error: () => alert('Error al obtener el lote'),
    //   })
    // )

  }


  // cargarLote(id: number): void {
  //   console.log(id)
  //   this.loteService.lotePorId(id).subscribe(lote => {
  //     this.formularioGroup.patchValue({
  //       fechaIngreso: lote.FechaIngreso,
  //       cantidadAnimales: lote.CantidadAnimales,
  //       pesoTotal: lote.PesoTotal,
  //       finalidad: lote.IdFinalidad,
  //       especie: lote.idEspecie,
  //       raza: lote.IdRaza,
  //       edadMeses: lote.EdadMeses
  //     });
  //   });
  // }

  getEspecies() {
    this.especieService.getAllEspecies().subscribe({
      next: (respuesta) => {
        this.listaEspecies = respuesta.listaEspecies;
        console.log(respuesta.listaEspecies); // Agregado para verificar
      },
      error: () => {
        alert('error al comunicarse con la API Especies');
      },
    });
  }

  cargarListadoFinalidad() {
    this.subscription.add(
      this.finalidadService.getAllFinalidades().subscribe((data) => {
        if (data.ok) {
          this.listaFinalidades = data.listaFinalidades;
          //alert(this.listaFinalidades[0].nombreFinalidad)
        }
        else {
          Swal.fire({
            title: 'Error al obtener el listado de finalidades',
            icon: 'error',
            confirmButtonText: "Ok"
          });
        }
      }
      )
    );
  }

  guardar() {
    this.idLote= this.activatedRoute.snapshot.params['idLote'];
    if (this.formularioGroup.valid) {


      this.formularioGroup.get('fechaIngreso')?.enable();
      this.formularioGroup.get('cantidadAnimales')?.enable();
      this.formularioGroup.get('pesoIngreso')?.enable();
      this.formularioGroup.get('idFinalidad')?.enable();
      this.formularioGroup.get('idRaza')?.enable();
      this.formularioGroup.get('edadMeses')?.enable();
      this.formularioGroup.get('cantidadActual')?.enable();
      // this.formularioGroup.get('pesoEgreso')?.enable();
      // this.formularioGroup.get('fechaEgreso')?.enable();



      // this.lote.fechaIngreso= this.formularioGroup.value.fechaIngreso;
      // this.lote.cantidadAnimales = this.formularioGroup.value.cantidadAnimales;
      // this.lote.pesoIngreso = this.formularioGroup.value.pesoIngreso;
      // this.lote.idFinalidad = this.formularioGroup.value.idFinalidad;
      // this.lote.idRaza = this.formularioGroup.value.idRaza;
      // this.lote.edadMeses = this.formularioGroup.value.edadMeses;
      // this.lote.cantidadActual = this.formularioGroup.value.cantidadActual;
      // this.lote.pesoEgreso = this.formularioGroup.value.pesoEgreso;
      // this.lote.fechaEgreso = this.formularioGroup.value.fechaEgreso;

      this.lote = this.formularioGroup.value;
      console.log(this.lote)
      this.subscription.add(
        this.loteService.modificarLote(this.idLote, this.lote).subscribe({
          next: (respuesta) => {
            if (respuesta.ok) {
              Swal.fire({
                title: 'Lote egresado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
                this.router.navigate(['consultarLotes'])
              });
            } else {
              Swal.fire({
                title: respuesta.error,
                icon: 'error',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
                this.router.navigate(['consultarLotes']);
              });
            }
          },
          error: (err: any) => {
            console.error(err);
            alert('Error al modificar el lote');
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
      this.irAListado();
    })

    
  }

  private irAListado() {
    this.router.navigate(['consultarLotes']);
  }

  get controlId(): FormControl {
    return this.formularioGroup.controls['idLote'] as FormControl
  }
  get controlFecha(): FormControl {
    return this.formularioGroup.controls['fechaIngreso'] as FormControl
  }
  get controlCantidad(): FormControl {
    return this.formularioGroup.controls['cantidadAnimales'] as FormControl
  }

  get controlCantActual(): FormControl {
    return this.formularioGroup.controls['cantidadActual'] as FormControl
  }
  get controlPeso(): FormControl {
    return this.formularioGroup.controls['pesoIngreso'] as FormControl
  }
  get controlFinalidad(): FormControl {
    return this.formularioGroup.controls['idFinalidad'] as FormControl
  }
  get controlEspecie(): FormControl {
    return this.formularioGroup.controls['idEspecie'] as FormControl
  }
  get controlRaza(): FormControl {
    return this.formularioGroup.controls['idRaza'] as FormControl
  }
  get controlEdad(): FormControl {
    return this.formularioGroup.controls['edadMeses'] as FormControl
  }
}
