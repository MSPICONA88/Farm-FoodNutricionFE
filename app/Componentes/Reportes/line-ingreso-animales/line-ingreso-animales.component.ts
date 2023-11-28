import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { EspecieService } from 'src/app/Services/Lote/Especie/especie.service';

@Component({
  selector: 'app-line-ingreso-animales',
  templateUrl: './line-ingreso-animales.component.html',
  styleUrls: ['./line-ingreso-animales.component.css']
})
export class LineIngresoAnimalesComponent {
  chartData: any;
  labelData: string[] = []; // Arreglo de etiquetas (meses y años)
  realData: any[] = []; // Arreglo de objetos con la estructura { especie: string, data: number[] }
  cantData: any[] = []; // Arreglo de arreglos de números que representan las cantidades de animales por especie
  datasets: any;
  fechaInicio: string;
  fechaFin: string;
  formularioGroup: FormGroup;



  constructor(
    private especieService: EspecieService,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.formularioGroup = this.formBuilder.group({
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    });

    this.renderChart2();
    this.changeFechas();

  }


  renderLineChart() {
    //const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'];
    const colors = ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)'];
    const canvas = document.getElementById('lineChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Error: No se pudo obtener el contexto del lienzo.');
      return;
    }

    // Verificar si ya existe un gráfico en el lienzo y destruirlo
    const existingChart = Chart.getChart('lineChart');
    if (existingChart) {
      existingChart.destroy();
    }

    // Crear el nuevo gráfico de líneas
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelData,
        datasets: this.datasets.map((dataset: any, index: number) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: colors[index],
          borderColor: colors[index],
          borderWidth: 3
        }))
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  // Función auxiliar para generar un color aleatorio
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderChart2() {
    this.especieService.reportLineAnimal().subscribe(result => {
      this.chartData = result;
      if (this.chartData != null) {
        const especies = Array.from(new Set(this.chartData.map((item: { especie: any; }) => item.especie))); // Obtener lista única de especies
        const meses = Array.from(new Set(this.chartData.map((item: { mes: any; }) => item.mes))); // Obtener lista única de meses
        const annos = Array.from(new Set(this.chartData.map((item: { año: any; }) => item.año))); // Obtener lista única de años

        this.labelData = meses.map(mes => `${mes}/${annos[0]}`); // Construir etiquetas del eje X
        this.datasets = especies.map(especie => {
          const data = meses.map(mes => {
            const item = this.chartData.find((entry: { especie: unknown; mes: unknown; }) => entry.especie === especie && entry.mes === mes);
            return item ? item.cantidadInicial : 0;
          });
          return { label: especie, data: data };
        });

        this.renderLineChart();
      }
    });
  }

  changeFechas() {
    this.formularioGroup.get('fechaInicio')?.valueChanges.subscribe((fechaInicio: string) => {
      if (fechaInicio) {
        this.onFechaInicioChange();
      }
    });

    this.formularioGroup.get('fechaFin')?.valueChanges.subscribe((fechaFin: string) => {
      if (fechaFin) {
        this.onFechaFinChange();
      }
    });
  }



  renderChartFecha(fechaInicio: string, fechaFin: string) {
    this.especieService.reportLineFecha(fechaInicio, fechaFin).subscribe(result => {
      this.chartData = result;
      if (this.chartData != null) {
        const especies = Array.from(new Set(this.chartData.map((item: { especie: any; }) => item.especie))); // Obtener lista única de especies
        const meses = Array.from(new Set(this.chartData.map((item: { mes: any; }) => item.mes))); // Obtener lista única de meses
        const annos = Array.from(new Set(this.chartData.map((item: { año: any; }) => item.año))); // Obtener lista única de años

        this.labelData = meses.map(mes => `${mes}/${annos[0]}`); // Construir etiquetas del eje X
        this.datasets = especies.map(especie => {
          const data = meses.map(mes => {
            const item = this.chartData.find((entry: { especie: unknown; mes: unknown; }) => entry.especie === especie && entry.mes === mes);
            return item ? item.cantidadActual : 0;
          });
          return { label: especie, data: data };
        });

        this.renderLineChart();
      }
    });
  }

  onFechaInicioChange() {
    const fechaInicio = this.formularioGroup.get('fechaInicio')?.value;
    const fechaFin = this.formularioGroup.get('fechaFin')?.value;
    if (fechaInicio && fechaFin) {
      this.renderChartFecha(fechaInicio, fechaFin);
    }
  }

  onFechaFinChange() {
    const fechaInicio = this.formularioGroup.get('fechaInicio')?.value;
    const fechaFin = this.formularioGroup.get('fechaFin')?.value;
    if (fechaInicio && fechaFin) {
      this.renderChartFecha(fechaInicio, fechaFin);
    }
  }







}






