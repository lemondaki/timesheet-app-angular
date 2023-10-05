export interface IProject {
  customerName: string;
  name: string;
  code: string;
  status: number;
  pms: string[];
  activeMember: number;
  projectType: number;
  timeStart: string;
  timeEnd: string;
  id: number;
}

export interface IProjectResponse<T> {
  result: T;
  targetUrl: string;
  success: boolean;
  error: IError | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

export interface IError {
  code: number;
  message: string;
  details: null;
  validationErrors: null;
}

export interface ITeamUser {
  name: string;
  emailAddress: string;
  isActive: boolean;
  type: number;
  jobTitle: string;
  level: number;
  userCode: string;
  avatarPath: string;
  avatarFullPath: string;
  readOnly: true;
  branch: number;
  branchColor: string;
  branchDisplayName: string;
  branchId: number;
  positionId: number;
  positionName: string;
  id: number;
  isTemp?: boolean;
  positionType?: 0;
}

export interface ITask {
  name: string;
  type: number;
  isDeleted: boolean;
  id: number;
  billable?: boolean;
}

export interface ITaskPost {
  taskId: number;
  billable: boolean;
  id?: number;
}

export interface ITeamUserResponse {
  userId: number;
  type: number;
  isTemp: boolean;
  id: number;
}
