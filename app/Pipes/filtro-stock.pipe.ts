import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroStock'
})
export class FiltroStockPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    console.log('Value:', value);
    console.log('Arg:', arg);

    const listadoStock = [];
    if (!value || value.length === 0 || arg === '') {
      return value;
    }

    for (const stock of value) {
      let found = false;
      
      // Buscar por nombre de dieta
      // if (stock.nombreDieta && stock.nombreDieta.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
      //   listadoStock.push(stock);
      //   found = true;
      // }
      
      // Buscar por nombre de alimentos
      // if (stock.alimentos) {
      //   for (const alimento of stock.alimentos) {
      //     if (alimento.nombreAlimento && alimento.nombreAlimento.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
      //       if (!found) {
      //         listadoStock.push(stock);
      //         found = true;
      //       }
      //       break; // Salir del bucle de alimentos
      //     }
      //   }
      // }

      //buscar por estado
      if (stock.estado && stock.estado.toUpperCase().indexOf(arg.toUpperCase()) > -1) {
        listadoStock.push(stock);
        found = true;
      }
    
      // Buscar por fecha de creación
      // if (stock.fechaCreacion && stock.fechaCreacion.toString().indexOf(arg.toLowerCase()) > -1) {
      //   if (!found) {
      //     listadoStock.push(stock);
      //     found = true;
      //   }
      // }
    }
    
    console.log('Dietas resultantes:', listadoStock);

    return listadoStock;

  }

}
