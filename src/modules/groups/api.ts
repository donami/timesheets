import { fetchApi, NormalizedResponse } from '../../services/api';
import { Group } from './store/models';
import { groupSchema } from '../../utils/schemas';

export const removeGroup = (groupId: number): Promise<NormalizedResponse> =>
  fetchApi(`groups/${groupId}`, 'DELETE');

export const fetchGroupById = (groupId: number): Promise<NormalizedResponse> =>
  fetchApi(`groups/${groupId}`, 'GET', groupSchema);

export const fetchGroups = (options: any = {}): Promise<NormalizedResponse> => {
  let url = 'groups';

  if (options.byUser) {
    url = `groups?byUser=${options.byUser}`;
  }

  // TODO: allow both options.byUser and options.skip to work together
  if (
    typeof options.skip !== 'undefined' &&
    typeof options.take !== 'undefined'
  ) {
    url = `groups?skip=${options.skip}&take=${options.take}`;
  }

  let body = {};

  if (options.except) {
    body = {
      ...body,
      except: options.except,
    };
  }

  return fetchApi(url, 'POST', [groupSchema], body);
};

export const createGroup = (
  group: Partial<Group>,
  userId: number
): Promise<NormalizedResponse> =>
  fetchApi(`groups/create`, 'POST', groupSchema, { ...group, userId });

export const updateGroup = (
  groupId: number,
  group: Group
): Promise<NormalizedResponse> =>
  fetchApi(`groups/${groupId}`, 'PUT', groupSchema, { ...group });

export const updateGroupMember = (
  groupId: number,
  userId: number
): Promise<NormalizedResponse> =>
  fetchApi(`groups/update-group-member`, 'PUT', groupSchema, {
    groupId,
    userId,
  });
