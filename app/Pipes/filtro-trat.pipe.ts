import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTrat'
})
export class FiltroTratPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    console.log('Value:', value);
    console.log('Arg:', arg);
    
    const tratamientos = [];
    if (!value || value.length === 0 || arg === '') {
      return value;
    }

    for (const tratamiento of value) {
      let found = false;

      // Buscar por nombre de Tratamiento
      if (tratamiento.nombreTratamiento && tratamiento.nombreTratamiento.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        tratamientos.push(tratamiento);
        found = true;
      }

      // Buscar por nombre de raza
      if (tratamiento.raza && tratamiento.raza.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        tratamientos.push(tratamiento);
        found = true;
      }

      // Buscar por nombre de especie
      if (tratamiento.especie && tratamiento.especie.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        tratamientos.push(tratamiento);
        found = true;
      }

      // Buscar por nombre de medicacion
      if (tratamiento.medicacion && tratamiento.medicacion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        tratamientos.push(tratamiento);
        found = true;
      }
      // Buscar por fecha de creación
      // if (dieta.fechaCreacion && dieta.fechaCreacion.toString().indexOf(arg.toLowerCase()) > -1) {
      //   if (!found) {
      //     dietas.push(dieta);
      //     found = true;
      //   }
      // }


    }

    console.log('Tratamientos resultantes:', tratamientos);

    return tratamientos;
  }

}
