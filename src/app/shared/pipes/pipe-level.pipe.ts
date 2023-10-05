import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'pipeLevel',
})
export class PipeLevelPipe implements PipeTransform {
  transform(type: number): string {
    switch (type) {
      case 0:
        return 'Internship';
      case 1:
        return 'Collaborator';
      case 2:
        return 'Staff';
      default:
        return 'Staff';
    }
  }
}
