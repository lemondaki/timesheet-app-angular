import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';
import { ITeamUser } from '../interface/response.interface';
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}
  mustHavePM() {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray: FormArray = control as FormArray;
      const isCheckHavePM = formArray.value.some(
        (user: ITeamUser) => user.type === 1
      );
      return isCheckHavePM ? null : { isRequiredPM: true };
    };
  }
}
