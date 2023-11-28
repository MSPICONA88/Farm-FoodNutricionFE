import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Especie } from 'src/app/Interfaces/especie';
import { Lote } from 'src/app/Interfaces/Lote';
import { Raza } from 'src/app/Interfaces/raza';
import { EspecieService } from 'src/app/Services/Lote/Especie/especie.service';
import { FinalidadService } from 'src/app/Services/Lote/Finalidad/finalidad.service';
import { LoteService } from 'src/app/Services/Lote/lote.service';
import { RazaService } from 'src/app/Services/Lote/Raza/raza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-lote',
  templateUrl: './modificar-lote.component.html',
  styleUrls: ['./modificar-lote.component.css']
})
export class ModificarLoteComponent {
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
      pesoIngreso: ['', [Validators.required]],
      idFinalidad: ['', [Validators.required]],
      idEspecie: ['', [Validators.required]],
      idRaza: ['', [Validators.required]],
      edadMeses: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
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
      this.lote.fechaIngreso= this.formularioGroup.value.fechaIngreso;
      this.lote.cantidadAnimales = this.formularioGroup.value.cantidadAnimales;
      this.lote.pesoIngreso = this.formularioGroup.value.pesoIngreso;
      this.lote.idFinalidad = this.formularioGroup.value.idFinalidad;
      this.lote.idRaza = this.formularioGroup.value.idRaza;
      this.lote.edadMeses = this.formularioGroup.value.edadMeses;

      console.log(this.lote)
      this.subscription.add(
        this.loteService.modificarLote(this.idLote, this.lote).subscribe({
          next: (respuesta) => {
            if (respuesta.ok) {
              Swal.fire({
                title: 'Lote modificado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();
              });
            } else {
              alert('No se pudo modificar el lote');
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
      this.irAHome();
    })

    this.irAHome();
  }

  private irAHome() {
    this.router.navigate(['']);
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
