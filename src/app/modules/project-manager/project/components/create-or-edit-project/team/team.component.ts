import { Component, Input } from '@angular/core';
import { toastService } from 'src/app/core/services/toast.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() teamFormGroup!: FormGroup;
  constructor(private toastService: toastService) {}
  handleShowError() {
    if (this.teamFormGroup.get('users')?.errors?.['required']) {
      this.toastService.showErrors(
        'Project must have at least 1 member!',
        3000
      );
      return;
    }
    if (this.teamFormGroup.get('users')?.errors?.['isRequiredPM']) {
      this.toastService.showErrors(
        'Project must have at least 1 PM, choose again!',
        3000
      );
      return;
    }
  }
}
