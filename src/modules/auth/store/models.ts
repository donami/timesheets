export enum NotificationType {
  TIMESHEET_APPROVED = 'TimesheetApproved',
  TIMESHEET_NEEDS_REVISEMENT = 'TimesheetNeedsRevisement',
}

export type Notification = {
  id: number;
  message: string;
  notificationType: NotificationType;
  unread: boolean;
  icon?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};
