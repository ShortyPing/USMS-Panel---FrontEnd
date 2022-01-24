import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wing'
})
export class WingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value=="left"?"Links":"Rechts";
  }

}
