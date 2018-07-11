import { createSelector } from 'reselect';
import { getSelectedGroup } from '../../groups/store/selectors';
import { getUserEntities } from '../../users/store/selectors';

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
  console.log(state);
  return state.common.language;
};
