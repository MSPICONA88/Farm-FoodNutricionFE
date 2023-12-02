import { Component } from '@angular/core';
import { PreguntaFrecuente } from 'src/app/Interfaces/preguntas';




@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent {

  show: boolean = false;
  
  preguntasFrecuenteslist: PreguntaFrecuente[] = [
    {
      categoria: 'Usuarios',
      preguntas: [
        {
          pregunta: '1. ¿Cómo puedo agregar nuevos usuarios al sistema?',
          respuesta: 'Para agregar nuevos usuarios, ve a la sección de Administración de Usuarios y selecciona la opción "Agregar Usuario". Completa la información requerida y guarda los cambios.',
        },
        {
          pregunta: '2. ¿Es posible asignar diferentes niveles de acceso a los usuarios?',
          respuesta: 'Sí, puedes asignar diferentes roles y niveles de acceso a los usuarios según sus responsabilidades. Esto se gestiona en la configuración de usuarios.',
        },
        // Otras preguntas relacionadas con métodos de pago
      ],
    },
    {
      categoria: 'Entregas',
      preguntas: [
        {
          pregunta: '¿Ofrecen entregas a domicilio?',
          respuesta: 'Sí, ofrecemos entregas a domicilio en determinadas zonas.',
        },
        // Otras preguntas relacionadas con entregas
      ],
    },
    // Agrega más categorías según tus necesidades
  ];
  
  ngOnInit() {

  }

  desplegar() {
    this.show = !this.show;
  }


  preguntasFrecuentes = this.preguntasFrecuenteslist;
  categoriaSeleccionada: string | null = null;
  preguntaSeleccionada: string | null = null;

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.preguntaSeleccionada = null;
  }

  seleccionarPregunta(pregunta: string): void {
    this.preguntaSeleccionada = pregunta;
  }

  
}
