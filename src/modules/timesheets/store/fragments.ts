import gql from 'graphql-tag';

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
