import { createSelector } from 'reselect';
import { getSelectedGroup } from '../../groups/store/selectors';
import {
  getUserEntities,
  getSelectedUserId,
} from '../../users/store/selectors';
import { getProjects } from '../../projects/store/selectors';
import { Project } from '../../projects/store/models';

export const getSelectedGroupMembers = createSelector(
  getSelectedGroup,
  getUserEntities,
  (group, users) => {
    if (!group || !users) {
      return [];
    }

    return group.members.map((userId: number) => users[userId as number]);
  }
);

export const getSelectedLanguage = (state: any) => {
  return state.common.language;
};

export const getSelectedUserProjects = createSelector(
  getSelectedUserId,
  getProjects,
  (userId, projects) => {
    return projects.filter((project: Project) => {
      if (project.members.find(member => member.user === userId)) {
        return true;
      }
      return false;
    });
  }
);
