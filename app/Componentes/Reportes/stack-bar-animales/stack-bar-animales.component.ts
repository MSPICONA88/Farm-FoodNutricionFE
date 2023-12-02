import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Especie } from 'src/app/Interfaces/especie';
import { Raza } from 'src/app/Interfaces/raza';
import { AnimalesService } from 'src/app/Services/Lote/Animales/animales.service';
import { EspecieService } from 'src/app/Services/Lote/Especie/especie.service';
import { RazaService } from 'src/app/Services/Lote/Raza/raza.service';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { AnimalExistence } from 'src/app/Interfaces/animalExistence';
import { ResultStock } from 'src/app/Interfaces/resultStock';
import { AnimalData } from 'src/app/Interfaces/animalData';
Chart.register(...registerables);



@Component({
  selector: 'app-stack-bar-animales',
  templateUrl: './stack-bar-animales.component.html',
  styleUrls: ['./stack-bar-animales.component.css']
})

export class StackBarAnimalesComponent {
  animalesDisponibles: any[] = [];
  formularioGroup: FormGroup;
  especie: Especie = new Especie();
  raza: Raza = new Raza();
  listaEspecies: any = [];
  listaRazas: any = [];
  idEspecie: number;
  idRaza: number;
  nombreEspecieInvalid: boolean = false;
  //datos: ChartData<'bar'>
  // datos: ChartDataset[] = [];
  datos: ChartData<'bar'>
  datosAnimales: AnimalData[];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: { x: { stacked: true }, y: { stacked: true } },

    // Otras configuraciones del gráfico
  };

  chartData: any;
  labelData: any[] = [];
  realData: any[] = [];
  cantData: any[] = [];
  labelData2: any[] = [];
  realData2: any[] = [];
  cantData2: any[] = [];
  chartData2: any;
  razasPorEspecie: any[] = [];
  private subscription = new Subscription();

  constructor(
    private especieService: EspecieService,
    private razaService: RazaService,
    private animalService: AnimalesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

    //this.cargarListadoRaza();
    this.formularioGroup = this.formBuilder.group({
      especie: ['', [Validators.required]],
      raza: ['', [Validators.required]]
    });
    this.getEspecies();
    this.getRazasPorEspecie();
    this.getIdRaza();
    // this.renderChart(labelData: any, maindata: any, cantData: any);
    //this.renderChart2();
    // if(this.formularioGroup?.get('especie')?.valueChanges || this.formularioGroup?.get('raza')?.valueChanges){
    //   this.changeFormControls();
    // }

    this.animalService.getAllAnimales().subscribe((datos: AnimalData[]) => {
      this.datosAnimales = datos;
      this.crearGrafico();
    });

  }


  crearGrafico() {
    const especiesUnicas = Array.from(
      new Set(this.datosAnimales.map((animal) => animal.especie))
    );
    const colores = this.generarColores(especiesUnicas.length);
  
    const datasetsPorEspecie = especiesUnicas.map((especie, especieIndex) => {
      const datosPorEspecie = this.datosAnimales
        .filter((animal) => animal.especie === especie)
        .map((animal, razaIndex) => ({
          label: animal.raza,
          data: [animal.sum],
          backgroundColor: colores[1], // Usa el índice de raza para obtener el color
          borderColor: colores[2],
          borderWidth: 1,
        }));
  
      return datosPorEspecie;
    });
  
    const razasUnicas = Array.from(
      new Set(this.datosAnimales.map((animal) => animal.raza))
    );
  
    const datasets = razasUnicas.map((raza, razaIndex) => {
      return {
        label: raza,
        data: datasetsPorEspecie
          .map((datosPorEspecie) =>
            datosPorEspecie.find((datos) => datos.label === raza)?.data[0] || 0
          ),
        backgroundColor: colores[3],
        borderColor: colores[4],
        borderWidth: 1,
      };
    });
  
    const ctx = document.getElementById('stackedBar') as HTMLCanvasElement;
    const miGrafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: especiesUnicas,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            stacked:true,
            beginAtZero: true,
            title: {
              display: true,
              color: 'black',
              text: 'Cantidad animales',
            },
          },
          x: {
            stacked:true,
            title: {
              display: true,
              color: 'black',
              text: 'Especie',
            },
          },
        },
      },
    });
  }

  generarColores(cantidad: number): string[] {
    // Lógica para generar colores aleatorios o utiliza una biblioteca específica
    // Por ejemplo, puedes usar una función que devuelva colores hexadecimales aleatorios.
    // Aquí hay un ejemplo simple:
    return Array.from({ length: cantidad }, () => '#' + Math.floor(Math.random() * 16777215).toString(16));
  }

  //funciona ok
  // renderChart(labelData: any, realData: any, cantData: any) {
  //   const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'];

  //   const myChart = new Chart("stackedBar", {
  //     type: 'bar',
  //     data: {
  //       labels: labelData,
  //       datasets: [{
  //         label: '# of Votes',
  //         data: cantData,
  //         backgroundColor: colors.slice(0, cantData.length),
  //         borderColor: colors.slice(0, cantData.length),
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }

  renderChart(labelData: any, realData: any, cantData: any) {
    const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'];

    const canvas = document.getElementById('stackedBar') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Error: No se pudo obtener el contexto del lienzo.');
      return;
    }

    // Verificar si ya existe un gráfico en el lienzo y destruirlo
    const existingChart = Chart.getChart('stackedBar');
    if (existingChart) {
      existingChart.destroy();
    }

    // Crear el nuevo gráfico
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [{
          label: 'Cantidad',
          data: cantData,
          backgroundColor: colors.slice(0, cantData.length),
          borderColor: colors.slice(0, cantData.length),
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 2,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      // plugins: {
      //   legend: {
      //     display: false
      //   }
      // }
    });
  }



  //funciona ok
  renderChart2() {
    this.animalService.getAllAnimales().subscribe(result => {
      this.chartData = result;
      if (this.chartData != null) {
        const especiesMap = new Map<string, number>(); // Mapa para almacenar la especie y la suma acumulada

        for (let i = 0; i < this.chartData.length; i++) {
          const especie = this.chartData[i].especie;
          const sum = this.chartData[i].sum;

          if (especiesMap.has(especie)) {
            const acumulado = especiesMap.get(especie);
            especiesMap.set(especie, acumulado + sum);
          } else {
            especiesMap.set(especie, sum);
          }
        }
        especiesMap.forEach((sum, especie) => {
          this.labelData.push(especie);
          this.cantData.push(sum);
        });
        this.renderChart(this.labelData, this.realData, this.cantData);
      }
    });
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

  getRazasPorEspecie() {
    this.formularioGroup?.get('especie')?.valueChanges.subscribe((x: number) => {
      if (x) { // Verificar si el valor de especie es válido
        this.idEspecie = x,
          console.log(this.idEspecie)
        this.changeFormControls();
        this.subscription.add(
          this.razaService.getRazasPorEspecie(x).subscribe({
            next: (respuesta) => {
              // this.listaRazas = respuesta.listaRazasPorEspecie;
              this.listaRazas = [''].concat(respuesta.listaRazasPorEspecie);
              this.changeFormControls();
              // this.getAnimalesDisponibles(x, this.controlRaza.value);
            },
            error: () => {
              alert('error al comunicarse con la API razas');
            },
          }),
        );
      }
    });
  }

  getIdRaza() {
    this.formularioGroup?.get('raza')?.valueChanges.subscribe((x: number) => {
      if (x) { // Verificar si el valor de especie es válido
        this.idRaza = x,
          console.log(this.idRaza);
        this.changeFormControls();
      }
    })
  }


  changeFormControls() {
    console.log(this.idEspecie);
    console.log(this.idRaza);

    this.animalService.getAnimalesDisponibles(this.idEspecie, this.idRaza).subscribe(
      (resultado: AnimalExistence[]) => {
        this.chartData2 = resultado;

        if (this.chartData2 != null) {
          const especiesMap2 = new Map<string, number>(); // Mapa para almacenar la especie y la suma acumulada

          this.labelData2 = []; // Reiniciar el arreglo de etiquetas antes de agregar nuevos valores
          this.cantData2 = []; // Reiniciar el arreglo de cantidades antes de agregar nuevos valores

          for (let i = 0; i < this.chartData2.length; i++) {
            const especie2 = this.chartData2[i].especie;
            const sum2 = this.chartData2[i].sum;

            if (especiesMap2.has(especie2)) {
              const acumulado2 = especiesMap2.get(especie2);
              especiesMap2.set(especie2, acumulado2 + sum2);
            } else {
              especiesMap2.set(especie2, sum2);
            }
          }

          especiesMap2.forEach((sum2, especie2) => {
            this.labelData2.push(especie2);
            this.cantData2.push(sum2);
          });

          this.renderChart(this.labelData2, this.realData2, this.cantData2);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }





  get controlEspecie(): FormControl {
    return this.formularioGroup.controls['especie'] as FormControl
  }
  get controlRaza(): FormControl {
    return this.formularioGroup.controls['raza'] as FormControl
  }

}
