export interface ITimeStatisticMember {
  userID: number;
  userName: string;
  projectUserType: number;
  totalWorkingTime: number;
  billableWorkingTime: number;
}

export interface IDateTimeInfor {
  start: string;
  end: string;
}

export interface ITimeStatisticTask {
  taskId: number;
  taskName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
  billable: boolean;
}
