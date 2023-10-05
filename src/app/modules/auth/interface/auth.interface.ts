export interface IUserAccount {
  userNameOrEmailAddress: string | number;
  password: string | number;
  rememberClient?: boolean;
}

export interface IAuthResponse {
  status: number;
  result: ITokenResponse;
  targetUrl: string;
  success: boolean;
  error: string;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

export interface ITokenResponse {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  userId: number;
}

export interface IUserInfor {
  userName: string;
  emailAddress: string;
  avatarFullPath: string;
}
