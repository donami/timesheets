import gql from 'graphql-tag';
import { TEMPLATE_LIST_ITEM_FRAGMENT } from './fragments';

export const TIMESHEET_LIST_ITEM_FRAGMENT = gql`
  fragment TimesheetListItem on Timesheet {
    id
    dateApproved
    dates {
      date
    }
    owner {
      id
      firstName
      lastName
    }
    periodStart
    status
    updatedAt
    createdAt
  }
`;

export const GET_TIMESHEETS = gql`
  query allTimesheets($companyId: ID) {
    allTimesheets(filter: { owner: { company: { id: $companyId } } }) {
      ...TimesheetListItem
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;

export const GET_TIMESHEET = gql`
  query getTimesheet($id: ID!) {
    Timesheet(id: $id) {
      id
      dateApproved
      dates {
        id
        date
        hours
        expected {
          inTime
          outTime
          break
          totalHours
        }
        reported {
          inTime
          outTime
          break
          totalHours
          message
        }
      }
      project {
        id
        name
      }
      logs {
        id
        message
        createdAt
      }
      owner {
        id
        firstName
        lastName
      }
      periodStart
      status
      updatedAt
      createdAt
    }
  }
`;

export const GET_TEMPLATES = gql`
  query allTemplates($companyId: ID!) {
    allTemplates(filter: { company: { id: $companyId } }) {
      ...TemplateListItem
    }
  }
  ${TEMPLATE_LIST_ITEM_FRAGMENT}
`;

export const GET_TEMPLATE = gql`
  query getTemplate($id: ID!) {
    Template(id: $id) {
      id
      name
      workHoursPerDay
      shiftStartTime
      shiftEndTime
      hoursDays {
        id
        inTime
        outTime
        break
        totalHours
        holiday
      }
    }
  }
`;
