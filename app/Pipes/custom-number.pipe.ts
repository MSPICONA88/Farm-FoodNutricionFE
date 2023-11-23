import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString('es-ES', {
      minimumIntegerDigits:1,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
