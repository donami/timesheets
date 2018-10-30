import gql from 'graphql-tag';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../../timesheets/store/queries';

export const PROJECT_LIST_ITEM_FRAGMENT = gql`
  fragment ProjectListItem on Project {
    id
    name
  }
`;

export const GET_PROJECTS = gql`
  query allProjects($companyId: ID!) {
    allProjects(filter: { company: { id: $companyId } }) {
      ...ProjectListItem
    }
  }
  ${PROJECT_LIST_ITEM_FRAGMENT}
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    Project(id: $id) {
      id
      name
      groups {
        id
        name
        users {
          id
          firstName
          lastName
        }
      }
      members {
        user {
          id
          email
          firstName
          lastName
        }
        role
      }
      timesheets {
        ...TimesheetListItem
      }
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;
