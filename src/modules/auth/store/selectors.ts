import { createSelector } from 'reselect';
import { getProjects } from '../../projects/store/selectors';
import { Project } from '../../projects/store/models';
import { UserRole } from '../../users/store/models';
import { getUserEntities } from '../../users/store/selectors';
import { Notification } from './models';
import { sortByRecentCreatedDates } from '../../../utils/helpers';

export const getAuthedUserId = (state: any) => state.auth.userId;

export const getIsAuthed = (state: any) => state.auth.isAuthed;

export const getNotificationEntities = (state: any) => state.auth.notifications;
export const getPasswordRecoveryState = (state: any) =>
  state.auth.passwordRecovery;

export const getAuthedUser = createSelector(
  getAuthedUserId,
  getUserEntities,
  (userId, entities) => {
    return entities[userId];
  }
);

export const getAuthedUserRole = createSelector(
  getAuthedUser,
  user => user.role
);

export const getAuthedUserProjects = createSelector(
  getAuthedUserId,
  getProjects,
  (userId, projects) => {
    return projects.filter((project: Project) => {
      return project.members.find(member => member.user === userId);
    });
  }
);

export const getAuthedUserProjectsWhereAdmin = createSelector(
  getAuthedUserId,
  getAuthedUserProjects,
  (userId, projects) => {
    return projects.filter((project: Project) => {
      return project.members.find(
        member => member.user === userId && member.role === UserRole.Admin
      );
    });
  }
);

export const getNotifications = createSelector(
  getAuthedUser,
  getNotificationEntities,
  (user, notifications) => {
    if (!user) {
      return [];
    }

    return user.notifications
      .map((id: any) => notifications[id])
      .sort(sortByRecentCreatedDates);
  }
);

export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications: Notification[]) =>
    notifications.filter(notification => notification.unread)
);
