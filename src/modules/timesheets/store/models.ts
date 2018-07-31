import { User } from '../../users/store/models';

export interface TimesheetItem {
  id: number;
  periodEnd: string;
  periodStart: string;
  status: TimesheetStatus;
  dateApproved?: string;
  dates?: any[];
  owner: User;
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
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
}

export enum TimesheetStatus {
  InProgress = 'IN_PROGRESS',
  InProgressSaved = 'IN_PROGRESS_SAVED',
  Approved = 'APPROVED',
  WaitingForApproval = 'WAITING_FOR_APPROVAL',
  NeedsRevisement = 'NEEDS_REVISEMENT',
}
