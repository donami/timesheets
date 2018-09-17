import gql from 'graphql-tag';

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
  query allTimesheets {
    allTimesheets {
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

export const TEMPLATE_LIST_ITEM_FRAGMENT = gql`
  fragment TemplateListItem on Template {
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
`;

export const GET_TEMPLATES = gql`
  query allTemplates {
    allTemplates {
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
