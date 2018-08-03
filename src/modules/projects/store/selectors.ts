import { createSelector } from 'reselect';
import { ProjectMember, Project } from './models';
import { getUserEntities } from '../../users/store/selectors';
import { getTimesheetEntities } from '../../timesheets/store/selectors';
import { TimesheetItem } from '../../timesheets/store/models';

const getProjectEntities = (state: any) => state.projects.byId;
const getProjectIds = (state: any) => state.projects.ids;
const getSelectedId = (state: any) => state.projects.selected;
export const getProjectsLoaded = (state: any) => state.projects.loaded;
export const getProjectsLoading = (state: any) => state.projects.loading;

export const getProjects = createSelector(
  getProjectEntities,
  getProjectIds,
  (entities, ids) => ids.map((id: number | string) => entities[id])
);

export const getSelectedProject = createSelector(
  getProjectEntities,
  getSelectedId,
  (entities, id) => {
    return entities[id];
  }
);

export const getSelectedProjectMembers = createSelector(
  getSelectedProject,
  getUserEntities,
  (project, users) => {
    if (!project || !users) {
      return [];
    }

    return project.members.map((member: ProjectMember) => {
      return {
        user: users[member.user as number],
        role: member.role,
      };
    });
  }
);

export const getSelectedProjectTimesheets = createSelector(
  getSelectedProject,
  getTimesheetEntities,
  (project: Project, timesheets: TimesheetItem[]) => {
    if (!project || !timesheets) {
      return [];
    }

    return (<number[]>project.timesheets).map(
      (timesheetId: number) => timesheets[timesheetId]
    );
  }
);
