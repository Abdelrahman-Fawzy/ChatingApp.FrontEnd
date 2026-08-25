import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: string): number {
    const today = new Date();
    const dateOfBitrh = new Date(value);

    let year = today.getFullYear() - dateOfBitrh.getFullYear();
    const monthDiffernece = today.getMonth() - dateOfBitrh.getMonth();

    if (
      monthDiffernece < 0 ||
      (monthDiffernece === 0 && today.getDate() - dateOfBitrh.getDate() < 0)
    )
      year--;

    return year;
  }
}
