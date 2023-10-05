import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-time-dialog',
  templateUrl: './custom-time-dialog.component.html',
  styleUrls: ['./custom-time-dialog.component.scss'],
})
export class CustomTimeDialogComponent {
  dateFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomTimeDialogComponent>
  ) {
    this.dateFormGroup = this.fb.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }

  handleCloseDialog() {
    if (this.dateFormGroup.valid) {
      const customDateTimeData: { startTime: string; endTime: string } = {
        startTime: this.dateFormGroup.value.dateStart,
        endTime: this.dateFormGroup.value.dateEnd,
      };
      this.dialogRef.close(customDateTimeData);
    }
  }
}
