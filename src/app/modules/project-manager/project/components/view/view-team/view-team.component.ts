import { Component, Input, OnChanges } from '@angular/core';
import { ITimeStatisticMember } from 'src/app/modules/project-manager/interface/view.interface';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss'],
})
export class ViewTeamComponent implements OnChanges {
  @Input() teamData!: ITimeStatisticMember[];
  totalHourWorkingTime: number = 0;
  totalBillableWorkingTime: number = 0;
  constructor() {}
  ngOnChanges() {
    this.totalHourWorkingTime = this.teamData.reduce(
      (acc, team) => team.totalWorkingTime + acc,
      0
    );
    this.totalBillableWorkingTime = this.teamData.reduce(
      (acc, team) => team.billableWorkingTime + acc,
      0
    );
  }
}
