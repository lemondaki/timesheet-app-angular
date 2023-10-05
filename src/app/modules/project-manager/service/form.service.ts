import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder, private validator: ValidatorService) {}

  initFormGroup(): FormGroup {
    return this.fb.group({
      generalFormGroup: this.fb.group({
        customerId: ['', Validators.required],
        name: ['', Validators.required],
        code: ['', Validators.required],
        timeStart: ['', Validators.required],
        timeEnd: ['', Validators.required],
        note: [''],
        status: 0,
        projectType: 1,
      }),

      teamFormGroup: this.fb.group({
        users: this.fb.array(
          [],
          [Validators.required, this.validator.mustHavePM()]
        ),
      }),

      taskFormGroup: this.fb.group({
        tasks: this.fb.array([], Validators.required),
      }),

      notificationFormGroup: this.fb.group({
        komuChannelId: [''],
        notifiList: this.fb.array([]),
      }),
    });
  }
}
