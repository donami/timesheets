import gql from 'graphql-tag';
import { COMPANY_VIEW_FRAGMENT } from './queries';

export const UPDATE_COMPANY = gql`
  mutation(
    $id: ID!
    $name: String
    $address: String
    $subscriptionStatus: String
  ) {
    updateCompany(
      id: $id
      name: $name
      address: $address
      subscriptionStatus: $subscriptionStatus
    ) {
      ...CompanyView
    }
  }
  ${COMPANY_VIEW_FRAGMENT}
`;
