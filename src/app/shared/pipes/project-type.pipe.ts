import { Pipe, PipeTransform } from '@angular/core';
import { EProjectTypeShortName } from 'src/app/modules/project-manager/enum/project.enum';

@Pipe({
  name: 'projectType',
})
export class ProjectTypePipe implements PipeTransform {
  transform(projectType: number): string {
    switch (projectType) {
      case 0:
        return EProjectTypeShortName.TM;
      case 1:
        return EProjectTypeShortName.FIXEDPRICE;
      case 2:
        return EProjectTypeShortName.NONBILLABLE;
      case 3:
        return EProjectTypeShortName.ODC;
      case 4:
        return EProjectTypeShortName.PRODUCT;
      case 5:
        return EProjectTypeShortName.TRAINING;
      default:
        return EProjectTypeShortName.NOSALLARY;
    }
  }
}
