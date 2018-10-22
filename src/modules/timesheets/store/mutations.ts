import gql from 'graphql-tag';
import { TEMPLATE_LIST_ITEM_FRAGMENT } from './fragments';

export const DELETE_TIMESHEET = gql`
  mutation deleteTimesheet($id: ID!) {
    deleteTimesheet(id: $id) {
      id
      __typename
    }
  }
`;

export const ADD_REPORTED_TO_DATE = gql`
  mutation updateDateItem(
    $id: ID!
    $break: Int!
    $inTime: String!
    $outTime: String!
    $holiday: Boolean
    $totalHours: Int
  ) {
    updateTimesheetDate(
      id: $id
      hours: $totalHours
      reported: {
        break: $break
        inTime: $inTime
        outTime: $outTime
        holiday: $holiday
        totalHours: $totalHours
      }
    ) {
      reported {
        id
      }
    }
  }
`;

export const DELETE_TEMPLATE = gql`
  mutation deleteTemplate($id: ID!) {
    deleteTemplate(id: $id) {
      __typename
      id
    }
  }
`;

export const CREATE_TEMPLATE = gql`
  mutation createTemplate(
    $name: String!
    $workHoursPerDay: Int!
    $shiftStartTime: String!
    $shiftEndTime: String!
    $hoursDays: [TemplatehoursDaysTemplateHoursDays!]
  ) {
    createTemplate(
      name: $name
      workHoursPerDay: $workHoursPerDay
      shiftStartTime: $shiftStartTime
      shiftEndTime: $shiftEndTime
      hoursDays: $hoursDays
    ) {
      ...TemplateListItem
    }
  }
  ${TEMPLATE_LIST_ITEM_FRAGMENT}
`;

export const UPDATE_TEMPLATE = gql`
  mutation updateTemplate(
    $id: ID!
    $name: String!
    $workHoursPerDay: Int!
    $shiftStartTime: String!
    $shiftEndTime: String!
    $hoursDays: [TemplatehoursDaysTemplateHoursDays!]
  ) {
    updateTemplate(
      id: $id
      name: $name
      workHoursPerDay: $workHoursPerDay
      shiftStartTime: $shiftStartTime
      shiftEndTime: $shiftEndTime
      hoursDays: $hoursDays
    ) {
      id
      name
    }
  }
`;

export const UPDATE_HOURS_DAYS = gql`
  mutation updateTemplateHoursDays(
    $id: ID!
    $break: Int
    $holiday: Boolean
    $inTime: String
    $outTime: String
    $totalHours: Int
  ) {
    updateTemplateHoursDays(
      id: $id
      break: $break
      holiday: $holiday
      inTime: $inTime
      outTime: $outTime
      totalHours: $totalHours
    ) {
      id
    }
  }
`;

export const UPDATE_TIMESHEET = gql`
  mutation update($id: ID!, $status: String!) {
    updateTimesheet(id: $id, status: $status) {
      __typename
      id
      status
    }
  }
`;
