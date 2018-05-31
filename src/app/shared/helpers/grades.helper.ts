export function gradeNumberToLetter(value: number): string {
  switch (true) {
    case value >= 95:
      return 'A';

    case value >= 85:
      return 'B';

    case value >= 75:
      return 'C';

    case value >= 65:
      return 'D';

    case value >= 60:
      return 'E';

    default:
     return 'Err';
  }
}
