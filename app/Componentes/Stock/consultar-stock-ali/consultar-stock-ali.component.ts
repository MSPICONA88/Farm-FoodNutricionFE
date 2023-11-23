import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultStock } from 'src/app/Interfaces/resultStock';
import { Stock } from 'src/app/Interfaces/stock';
import { AlimentoService } from 'src/app/Services/Alimento/alimento.service';
import { IngresoStockService } from 'src/app/Services/Stock/ingreso-stock.service';
import Swal from 'sweetalert2';
import { IngresarStockComponent } from '../ingresar-stock/ingresar-stock.component';

@Component({
  selector: 'app-consultar-stock-ali',
  templateUrl: './consultar-stock-ali.component.html',
  styleUrls: ['./consultar-stock-ali.component.css']
})
export class ConsultarStockAliComponent {
  listaAlimentos: any = [];
  idAlimentoSel: string;
  formularioGroup: FormGroup;
  StockPorAli: ResultStock;
  private activatedRoute: ActivatedRoute;

  private subscription = new Subscription();

  constructor(

    private alimentoService: AlimentoService,
    private stockService: IngresoStockService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.getAlimentos();

    this.formularioGroup = this.formBuilder.group({
      // idAlimentoSel: [],
      idAlimento: ['', [Validators.required]],
      nombreAlimento: ['', [Validators.required]],
      toneladas: ['', [Validators.required]],
    });

  }


  cargarStock() {
    console.log("llego a cargar")
    const id = this.idAlimentoSel;
    console.log(id)
    if (this.stockService) {
      this.subscription.add(
        this.stockService.stockPorAli(id).subscribe(
          (data) => {
            if (data) {
              this.StockPorAli = data;
              console.log(this.StockPorAli)
              this.formularioGroup.disable()
              this.formularioGroup.patchValue(data)
            }
            else {
              Swal.fire({
                title: 'Error al obtener el stock',
                icon: 'error',
                confirmButtonText: "Ok"
              });
            }
          }
        )
      );
    } 
    else {
      console.error("stockService es null");
    }
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

  get controlIdAlimentoSel(): FormControl {
    return this.formularioGroup.controls['idAlimentoSel'] as FormControl
  }
  get controlIdAlimento(): FormControl {
    return this.formularioGroup.controls['idAlimento'] as FormControl
  }
  get controlNombreAlimento(): FormControl {
    return this.formularioGroup.controls['nombreAlimento'] as FormControl
  }
  get controlToneladas(): FormControl {
    return this.formularioGroup.controls['toneladas'] as FormControl
  }

}
