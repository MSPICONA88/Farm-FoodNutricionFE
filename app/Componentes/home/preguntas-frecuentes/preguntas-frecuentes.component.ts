import { Component } from '@angular/core';
import faqsData from 'src/assets/faqs.json';



@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent {

  show: boolean=false;


  constructor(){

  }

  ngOnInit(){

  }

  desplegar(){
    this.show=!this.show;
  }
  
}
