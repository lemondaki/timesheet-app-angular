import { ITaskPost, ITeamUserResponse } from './response.interface';
export interface IStatusProject {
  value: number;
  name: string;
  quantity: number;
}

export interface IQuantityProject {
  status: number;
  quantity: number;
}

export interface ICustomer {
  name: string;
  id: number;
}

export interface IBranchFilter {
  name: string;
  displayName: string;
  id: number;
}

export interface IPositionMember {
  typeId: number;
  typeName: string;
}

export interface ITempMember {
  isTemp: boolean;
  tempName: string;
}

export interface IProjectType {
  projectTypeId: number;
  typeName: string;
}

export interface projectTargetUsers {
  userId: number;
  roleName: string;
  id: number;
}

export interface INotificationItem {
  id: number;
  type: string;
  isNotice: boolean;
}

export interface IProjectData {
  name: string;
  code: string;
  status: number;
  timeStart: string;
  timeEnd: string;
  note: string;
  projectType: number;
  customerId: number;
  tasks: ITaskPost[];
  users: ITeamUserResponse[];
  projectTargetUsers: projectTargetUsers[];
  komuChannelId: string;
  isNotifyToKomu: boolean;
  isNoticeKMSubmitTS: boolean;
  isNoticeKMRequestOffDate: boolean;
  isNoticeKMApproveRequestOffDate: boolean;
  isNoticeKMRequestChangeWorkingTime: boolean;
  isNoticeKMApproveChangeWorkingTime: boolean;
  isAllUserBelongTo: boolean;
  id?: number;
}
