export enum NotificationType {
  TIMESHEET_APPROVED = 'TimesheetApproved',
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
  // createdBy?: UserModel;
};
