import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/Interfaces/stock';
import { AlimentoService } from 'src/app/Services/Alimento/alimento.service';
import { TipoMovimientoService } from 'src/app/Services/Movimiento/tipo-movimiento.service';
import { IngresoStockService } from 'src/app/Services/Stock/ingreso-stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-movi',
  templateUrl: './registrar-movi.component.html',
  styleUrls: ['./registrar-movi.component.css']
})
export class RegistrarMoviComponent {
  formularioGroup: FormGroup;
  listaAlimentos: any = [];
  listaMovimientos: any= [];
  stock: Stock = new Stock();
  private subscription = new Subscription();

  constructor(

    private alimentoService: AlimentoService,
    private movimientoService: TipoMovimientoService,
    private stockService: IngresoStockService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.getAlimentos();
    this.getMovimientos();
    this.formularioGroup = this.formBuilder.group({
      idAlimento: ['', [Validators.required]],
      fechaRegistro: ['', [Validators.required]],
      toneladas: ['', [Validators.required]],
      idTipoMovimiento: ['', [Validators.required]]
    });

  }



  getAlimentos() {
    this.alimentoService.getAllAlimentos().subscribe({
      next: (respuesta) => {
        this.listaAlimentos = respuesta.listaAlimentos;
        //console.log(respuesta.listaAlimentos); // Agregado para verificar
      },
      error: () => {
        alert('error al comunicarse con la API');
      },
    });
  }

  getMovimientos(){
    this.movimientoService.getAllMovimientos().subscribe({
      next: (respuesta) => {
        this.listaMovimientos = respuesta.listaMovimientos;
        //console.log(respuesta.listaAlimentos); // Agregado para verificar
      },
      error: () => {
        alert('error al comunicarse con la API');
      },
    });
  }

  guardar2() {
    if (this.formularioGroup.valid) {
      this.stock.idAlimento = this.formularioGroup.value.idAlimento;
      this.stock.fechaRegistro = this.formularioGroup.value.fechaRegistro;
      this.stock.toneladas = this.formularioGroup.value.toneladas;
      this.stock.idTipoMovimiento= this.formularioGroup.value.idTipoMovimiento;

      console.log(this.stock)
      this.subscription.add(
        this.stockService.postMovi(this.stock).subscribe({
          next: (respuesta) => {
            if (respuesta.ok) {
              Swal.fire({
                title: 'Movimiento registrado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.limpiarForm();

              });
            } else {
              Swal.fire({
                title: respuesta.error,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          },
          error: (err: any) => {
            console.error(err);
            Swal.fire({
              title: 'Error al registrar el movimiento',
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

  get controlAlimento(): FormControl {
    return this.formularioGroup.controls['idAlimento'] as FormControl
  }
  get controlFecha(): FormControl {
    return this.formularioGroup.controls['fechaRegistro'] as FormControl
  }
  get controlToneladas(): FormControl {
    return this.formularioGroup.controls['toneladas'] as FormControl
  }
  get controlPrecioTone(): FormControl {
    return this.formularioGroup.controls['idTipoMovimiento'] as FormControl
  }

}
