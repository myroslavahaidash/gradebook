import { Pipe, PipeTransform } from '@angular/core';
import { gradeNumberToLetter } from './grades.helper';

@Pipe({
  name: 'letterGrade'
})
export class LetterGradePipe implements PipeTransform {
  transform(value: number, args?: any): string {
    return gradeNumberToLetter(value);
  }

}
