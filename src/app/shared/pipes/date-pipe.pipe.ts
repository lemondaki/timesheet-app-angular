import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
})
export class DatePipePipe implements PipeTransform {
  transform(dateInput: string): string {
    const inputDate = new Date(dateInput);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const customDate = `${year}-${month}-${day}`;
    return customDate;
  }
}
