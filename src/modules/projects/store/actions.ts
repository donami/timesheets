import types from './types';
import { Project } from './models';

export const fetchProjects = () => ({
  type: types.FETCH_PROJECTS,
});

export const selectProject = (projectId: number) => ({
  type: types.SELECT_PROJECT,
  payload: {
    projectId,
  },
});

export const fetchProjectById = (projectId: number) => ({
  type: types.FETCH_PROJECT_BY_ID,
  payload: {
    projectId,
  },
});

export const updateProject = (projectId: number, project: Project) => ({
  type: types.UPDATE_PROJECT.REQUEST,
  payload: {
    projectId,
    project,
  },
});
