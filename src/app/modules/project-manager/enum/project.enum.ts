export enum EStatusNumber {
  ACTIVE = 0,
  DEACTIVE = 1,
  ALL = 2,
}

export enum EStatusProjectValue {
  ACTIVE = 'Active Projects',
  DEACTIVE = 'Dctive Projects',
  ALL = 'All Projects',
}

export enum EConfirmDialogStyle {
  width = '500px',
  height = '310px',
}

export enum EViewDialogStyle {
  width = '900px',
  height = '660px',
}

export enum ECustomTimeDialogStyle {
  width = '260px',
  height = '340px',
}

export enum ETypeMember {
  ALL = 'ALL',
  STAFF = 'STAFF',
  INTERNSHIP = 'INTERNSHIP',
  COLLABORATOR = 'COLLABORATOR',
}

export enum EPositionMember {
  MEMBER = 'Member',
  PM = 'PM',
  SHADOW = 'Shadow',
  DEACTIVE = 'Deactive',
}

export enum ETempMember {
  TEMP = 'Temp',
  OFFICIAL = 'Official',
}

export enum EProjectType {
  TM = 'T&M',
  FIXEDPRICE = 'Fixed Price',
  NONBILLABLE = 'Non-Billable',
  ODC = 'ODC',
  PRODUCT = 'Product',
  TRAINING = 'Training',
  NOSALLARY = 'NoSalary',
}

export enum EProjectTypeShortName {
  TM = 'T&M',
  FIXEDPRICE = 'FF',
  NONBILLABLE = 'NB',
  ODC = 'ODC',
  PRODUCT = 'PD',
  TRAINING = 'TN',
  NOSALLARY = 'NS',
}

export enum EProjectTypeValue {
  TM = 0,
  FIXEDPRICE = 1,
  NONBILLABLE = 2,
  ODC = 3,
  PRODUCT = 4,
  TRAINING = 5,
  NOSALLARY = 6,
}

export enum EProjectTypeNotification {
  SUBMIT_TIMESHEET = 'Submit timesheet',
  REQUEST_OFF = 'Request Off/Remote/Onsite/Đi muộn, về sớm',
  APPROVE_REQUEST_OFF = 'Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm',
  REQUEST_CHANGE_TIME = 'Request Change Working Time',
  APPROVE_REQUEST_CHANGE_TIME = 'Approve/Reject Change Working Time',
}

export enum ELevel {
  INTERN_0 = 0,
  INTERN_1 = 1,
  INTERN_2 = 2,
  INTERN_3 = 3,
  FRESHER_MINUS = 4,
  FRESHER = 5,
  FRESHER_PLUS = 6,
  JUNIOR_MINUS = 7,
  JUNIOR = 8,
  JUNIOR_PLUS = 9,
  MIDDLE_MINUS = 10,
  MIDDLE = 11,
  MIDDLE_PLUS = 12,
  SENIOR_MINUS = 13,
  SENIOR = 14,
  SENIOR_PLUS = 15,
}
