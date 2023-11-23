import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDietas'
})
export class FiltroDietasPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    console.log('Value:', value);
    console.log('Arg:', arg);

    const dietas = [];
    if (!value || value.length === 0 || arg === '') {
      return value;
    }

    for (const dieta of value) {
      let found = false;
      
      // Buscar por nombre de dieta
      if (dieta.nombreDieta && dieta.nombreDieta.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        dietas.push(dieta);
        found = true;
      }
      
      // Buscar por nombre de alimentos
      if (dieta.alimentos) {
        for (const alimento of dieta.alimentos) {
          if (alimento.nombreAlimento && alimento.nombreAlimento.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            if (!found) {
              dietas.push(dieta);
              found = true;
            }
            break; // Salir del bucle de alimentos
          }
        }
      }
    
      // Buscar por fecha de creación
      if (dieta.fechaCreacion && dieta.fechaCreacion.toString().indexOf(arg.toLowerCase()) > -1) {
        if (!found) {
          dietas.push(dieta);
          found = true;
        }
      }
    }
    
    console.log('Dietas resultantes:', dietas);

    return dietas;

  }
}
