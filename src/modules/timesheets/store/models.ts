import { User } from '../../users/store/models';

export interface TimesheetItem {
  id: number;
  periodEnd: string;
  periodStart: string;
  status: TimesheetStatus;
  dateApproved?: string;
  updatedAt: string;
  createdAt: string;
  dates?: any[];
  owner: User | number;
}

export enum ReportType {
  Hours = 'HOURS',
  StartEnd = 'StartEnd',
}

export interface DayType {
  from: string;
  to: string;
  holiday?: boolean;
}

export type ExpectedHoursDayType = {
  inTime: string;
  outTime: string;
  totalHours: number;
  break: number;
  holiday: boolean;
};

export interface TimesheetTemplateItem {
  id: number;
  name: string;
  workHoursPerDay: number;
  shiftStartTime?: string;
  shiftEndTime?: string;
  reportType: ReportType;
  startEndDays?: {
    monday: DayType;
    tuesday: DayType;
    wednesday: DayType;
    thursday: DayType;
    friday: DayType;
    saturday: DayType;
    sunday: DayType;
  };
  hoursDays: {
    monday: ExpectedHoursDayType;
    tuesday: ExpectedHoursDayType;
    wednesday: ExpectedHoursDayType;
    thursday: ExpectedHoursDayType;
    friday: ExpectedHoursDayType;
    saturday: ExpectedHoursDayType;
    sunday: ExpectedHoursDayType;
  };
}

export enum TimesheetStatus {
  InProgress = 'IN_PROGRESS',
  InProgressSaved = 'IN_PROGRESS_SAVED',
  Approved = 'APPROVED',
  WaitingForApproval = 'WAITING_FOR_APPROVAL',
  NeedsRevisement = 'NEEDS_REVISEMENT',
}

export enum ConflictResolve {
  DISCARD_NEW = 'DISCARD_NEW',
  DISCARD_OLD = 'DISCARD_OLD',
}
