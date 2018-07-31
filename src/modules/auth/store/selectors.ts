import { createSelector } from 'reselect';
import { getProjects } from '../../projects/store/selectors';
import { Project } from '../../projects/store/models';
import { UserRole } from '../../users/store/models';
import { getUserEntities } from '../../users/store/selectors';

export const getAuthedUserId = (state: any) => state.auth.userId;

export const getIsAuthed = (state: any) => state.auth.isAuthed;

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
