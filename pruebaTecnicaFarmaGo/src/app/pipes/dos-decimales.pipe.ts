import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dosDecimales'
})
export class DosDecimalesPipe implements PipeTransform {
  
  transform(value: number): string {
    if (typeof value !== 'number') return value;
    return value.toFixed(2);
  }

}
