import { createRequestTypes } from '../../../store/utils';

const FETCH_USERS = createRequestTypes('FETCH_USERS');
const FETCH_USERS_IF_NEEDED = 'FETCH_USERS_IF_NEEDED';
const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
const FETCH_USER_BY_ID_REQUEST = 'FETCH_USER_BY_ID_REQUEST';
const FETCH_USER_BY_ID_SUCCESS = 'FETCH_USER_BY_ID_SUCCESS';
const FETCH_USER_BY_ID_FAILURE = 'FETCH_USER_BY_ID_FAILURE';
const SELECT_USER = 'SELECT_USER';
const SELECT_USER_SUCCESS = 'SELECT_USER_SUCCESS';
const SELECT_USER_FAILURE = 'SELECT_USER_FAILURE';
const UPDATE_USER = createRequestTypes('UPDATE_USER');
const CREATE_USER = createRequestTypes('CREATE_USER');
const LOAD_USER_PAGE = 'LOAD_USER_PAGE';

export default {
  FETCH_USERS,
  FETCH_USERS_IF_NEEDED,
  FETCH_USER_BY_ID,
  FETCH_USER_BY_ID_REQUEST,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_FAILURE,
  SELECT_USER,
  SELECT_USER_SUCCESS,
  SELECT_USER_FAILURE,
  UPDATE_USER,
  CREATE_USER,
  LOAD_USER_PAGE,
};
