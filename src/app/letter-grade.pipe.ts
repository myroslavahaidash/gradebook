import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letterGrade'
})
export class LetterGradePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let mark;

    switch (true) {
      case value >= 95:
        mark = 'A';
        break;

      case value >= 85:
        mark = 'B';
        break;

      case value >= 75:
        mark = 'C';
        break;

      case value >= 65:
        mark = 'D';
        break;

      case value >= 60:
        mark = 'E';
        break;

      default:
        mark = 'Err';
    }

    return mark;
  }

}
