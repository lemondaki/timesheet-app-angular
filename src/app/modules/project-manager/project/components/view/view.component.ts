import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EViewTimeSelect } from '../../../enum/view.enum';
import { EShortMonthName } from '../../../enum/view.enum';
import {
  IDateTimeInfor,
  ITimeStatisticMember,
  ITimeStatisticTask,
} from '../../../interface/view.interface';
import { ViewService } from '../../../service/view.service';
import { CustomTimeDialogComponent } from './custom-time-dialog/custom-time-dialog.component';
import { ECustomTimeDialogStyle } from '../../../enum/project.enum';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  timeSelected = EViewTimeSelect.WEEK;
  dayStartOfWeek: number = 0;
  dayEndOfWeek: number = 0;
  dayStartOfMonth: number = 0;
  dayEndOfMonth: number = 0;
  displayDateTime: string = '';
  nextStepNumber: number = 0;
  currentDate: Date = new Date();
  dateTimeDateInfor!: IDateTimeInfor;
  listTeamInfor: ITimeStatisticMember[] = [];
  listTasksInfor: ITimeStatisticTask[] = [];
  isCheckHasCustomTime: boolean = false;
  monthNames = [
    { name: EShortMonthName.JAN },
    { name: EShortMonthName.FEB },
    { name: EShortMonthName.MAR },
    { name: EShortMonthName.APR },
    { name: EShortMonthName.MAY },
    { name: EShortMonthName.JUN },
    { name: EShortMonthName.JUL },
    { name: EShortMonthName.AUG },
    { name: EShortMonthName.SEP },
    { name: EShortMonthName.OCT },
    { name: EShortMonthName.NOV },
    { name: EShortMonthName.DEC },
  ];
  ViewTimeSelect = [
    {
      value: EViewTimeSelect.WEEK,
    },
    {
      value: EViewTimeSelect.MONTH,
    },
    {
      value: EViewTimeSelect.QUATER,
    },
    {
      value: EViewTimeSelect.YEAR,
    },
    {
      value: EViewTimeSelect.ALL_TIME,
    },
    {
      value: EViewTimeSelect.CUSTOM_TIME,
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    private viewService: ViewService,
    private dialog: MatDialog
  ) {}

  getLastDayOfMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayofMonth = new Date(year, month + 1, 0);
    return lastDayofMonth.getDate();
  }

  getMonthNumeric(date: Date): string {
    return (date.getMonth() + 1).toString().padStart(2, '0');
  }

  getDateNumeric(date: number): string {
    return date.toString().padStart(2, '0');
  }

  formatTimeWeek(date: Date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    const year = date.getFullYear();
    startDate.setDate(date.getDate() - date.getDay() + 1);
    endDate.setDate(date.getDate() - date.getDay() + 7);
    const weekTime = {
      dayStart: startDate.getDate().toString().padStart(2, '0'),
      monthStart: this.monthNames[startDate.getMonth()].name,
      dayEnd: endDate.getDate().toString().padStart(2, '0'),
      monthEnd: this.monthNames[endDate.getMonth()].name,
    };
    const { dayStart, monthStart, dayEnd, monthEnd } = weekTime;
    this.dateTimeDateInfor = {
      start: `${year}-${this.getMonthNumeric(startDate)}-${dayStart}`,
      end: `${year}-${this.getMonthNumeric(endDate)}-${dayEnd}`,
    };
    return (this.displayDateTime = `Week: ${dayStart} ${
      monthStart === monthEnd ? '' : monthStart
    } - ${dayEnd} ${monthEnd} ${year}`);
  }

  formatTimeMonth(date: Date) {
    const year = date.getFullYear();
    const month = this.monthNames[date.getMonth()].name;
    const lastDate = this.getLastDayOfMonth(date);
    const dateTimeInfor = `${year}-${this.getMonthNumeric(date)}`;
    this.dateTimeDateInfor = {
      start: `${dateTimeInfor}-01`,
      end: `${dateTimeInfor}-${lastDate}`,
    };
    return `Month: 1 - ${lastDate} ${month} ${year}`;
  }

  formatTimeQuater(date: Date) {
    const year = date.getFullYear();
    const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
    const quarterEndMonth = quarterStartMonth + 2;
    const quarterStartDate = new Date(year, quarterStartMonth, 1);
    const quarterEndDate = new Date(year, quarterEndMonth + 1, 0);
    const { startMonth, endMonth, lastDateQuater } = {
      startMonth: this.monthNames[quarterStartDate.getMonth()].name,
      endMonth: this.monthNames[quarterEndDate.getMonth()].name,
      lastDateQuater: quarterEndDate.getDate(),
    };
    this.dateTimeDateInfor = {
      start: `${year}-${this.getMonthNumeric(quarterStartDate)}-01`,
      end: `${year}-${this.getMonthNumeric(quarterEndDate)}-${lastDateQuater}`,
    };
    return `Quater: 1 ${startMonth} - ${lastDateQuater} ${endMonth} ${year}`;
  }

  handleNextTime() {
    switch (this.timeSelected) {
      case EViewTimeSelect.WEEK:
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        break;
      case EViewTimeSelect.MONTH:
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        break;
      case EViewTimeSelect.QUATER:
        this.currentDate.setMonth(this.currentDate.getMonth() + 3);
        break;
      case EViewTimeSelect.YEAR:
        this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
        break;
    }
    if (this.timeSelected === EViewTimeSelect.CUSTOM_TIME) {
      return;
    }
    this.handleFormatDateTime(new Date(this.currentDate));
  }

  handlePrevTime() {
    switch (this.timeSelected) {
      case EViewTimeSelect.WEEK:
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        break;
      case EViewTimeSelect.MONTH:
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        break;
      case EViewTimeSelect.QUATER:
        this.currentDate.setMonth(this.currentDate.getMonth() - 3);
        break;
      case EViewTimeSelect.YEAR:
        this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
        break;
    }
    if (this.timeSelected === EViewTimeSelect.CUSTOM_TIME) {
      return;
    }
    this.handleFormatDateTime(new Date(this.currentDate));
  }

  handleFormatDateTime(date: Date = this.currentDate) {
    const year = date.getFullYear();
    switch (this.timeSelected) {
      case EViewTimeSelect.MONTH:
        this.displayDateTime = this.formatTimeMonth(date);
        this.handleGetDataTeamBelongTime();
        break;
      case EViewTimeSelect.QUATER:
        this.displayDateTime = this.formatTimeQuater(date);
        this.handleGetDataTeamBelongTime();
        break;
      case EViewTimeSelect.YEAR:
        this.displayDateTime = `Year: 1 Jan - 31 Dec ${year}`;
        this.dateTimeDateInfor = {
          start: `${year}-01-01`,
          end: `${year}-12-31`,
        };
        this.handleGetDataTeamBelongTime();
        break;
      case EViewTimeSelect.ALL_TIME:
        this.displayDateTime = EViewTimeSelect.ALL_TIME;
        this.dateTimeDateInfor = { start: '', end: '' };
        this.handleGetDataTeamBelongTime();
        break;
      case EViewTimeSelect.CUSTOM_TIME:
        this.displayDateTime = EViewTimeSelect.CUSTOM_TIME;
        this.handleOpenCustomTimeDialog();
        break;
      default:
        this.displayDateTime = this.formatTimeWeek(date);
        this.handleGetDataTeamBelongTime();
    }
  }

  handleGetDataTeamBelongTime() {
    this.viewService
      .GetTimeSheetStatisticTeams(
        this.data.projectId,
        this.dateTimeDateInfor.start,
        this.dateTimeDateInfor.end
      )
      .subscribe((data) => {
        this.listTeamInfor = data.result;
      });

    this.viewService
      .GetTimeSheetStatisticTasks(
        this.data.projectId,
        this.dateTimeDateInfor.start,
        this.dateTimeDateInfor.end
      )
      .subscribe((data) => {
        this.listTasksInfor = data.result;
      });
  }

  handleOpenCustomTimeDialog() {
    const dialogRef = this.dialog.open(CustomTimeDialogComponent, {
      width: ECustomTimeDialogStyle.width,
      height: ECustomTimeDialogStyle.height,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const start = new Date(result.startTime);
        const end = new Date(result.endTime);
        const startYear = start.getFullYear();
        const startMonth = start.getMonth();
        const startDate = start.getDate();
        const endYear = end.getFullYear();
        const endMonth = end.getMonth();
        const endDate = end.getDate();
        this.isCheckHasCustomTime = true;
        this.displayDateTime = `${startDate} 
        ${this.monthNames[startMonth].name} ${startYear} - 
        ${endDate} ${this.monthNames[endMonth].name} ${endYear}`;

        this.dateTimeDateInfor = {
          start: `${startYear}-${this.getMonthNumeric(
            start
          )}-${this.getDateNumeric(startDate)}`,
          end: `${endYear}-${this.getMonthNumeric(end)}-${this.getDateNumeric(
            endDate
          )}`,
        };
        this.handleGetDataTeamBelongTime();
      }
    });
  }

  ngOnInit(): void {
    this.handleFormatDateTime();
  }
}
