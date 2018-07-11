import { createRequestTypes } from '../../../store/utils';

const FETCH_GROUPS = 'FETCH_GROUPS';
const FETCH_GROUPS_REQUEST = 'FETCH_GROUPS_REQUEST';
const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';
const FETCH_GROUP_BY_ID = 'FETCH_GROUP_BY_ID';
const FETCH_GROUP_BY_ID_REQUEST = 'FETCH_GROUP_BY_ID_REQUEST';
const FETCH_GROUP_BY_ID_SUCCESS = 'FETCH_GROUP_BY_ID_SUCCESS';
const FETCH_GROUP_BY_ID_FAILURE = 'FETCH_GROUP_BY_ID_FAILURE';
const SELECT_GROUP = 'SELECT_GROUP';
const SELECT_GROUP_SUCCESS = 'SELECT_GROUP_SUCCESS';
const SELECT_GROUP_FAILURE = 'SELECT_GROUP_FAILURE';
const UPDATE_GROUP = createRequestTypes('UPDATE_GROUP');
const UPDATE_GROUP_MEMBER = createRequestTypes('UPDATE_GROUP_MEMBER');

export default {
  FETCH_GROUPS,
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
  FETCH_GROUP_BY_ID,
  FETCH_GROUP_BY_ID_REQUEST,
  FETCH_GROUP_BY_ID_SUCCESS,
  FETCH_GROUP_BY_ID_FAILURE,
  SELECT_GROUP,
  SELECT_GROUP_SUCCESS,
  SELECT_GROUP_FAILURE,
  UPDATE_GROUP,
  UPDATE_GROUP_MEMBER,
};
