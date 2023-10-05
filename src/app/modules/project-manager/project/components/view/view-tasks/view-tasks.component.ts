import { Component, Input, OnChanges } from '@angular/core';
import { ITimeStatisticTask } from 'src/app/modules/project-manager/interface/view.interface';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnChanges {
  @Input() taskData!: ITimeStatisticTask[];
  totalHourWorkingTime: number = 0;
  totalBillableWorkingTime: number = 0;
  ngOnChanges(): void {
    this.totalHourWorkingTime = this.taskData.reduce(
      (acc, task) => task.totalWorkingTime + acc,
      0
    );

    this.totalBillableWorkingTime = this.taskData.reduce(
      (acc, task) => task.billableWorkingTime + acc,
      0
    );
  }
}
