import gql from 'graphql-tag';
import { COMPANY_VIEW_FRAGMENT } from './queries';

export const UPDATE_COMPANY = gql`
  mutation($id: ID!, $name: String, $address: String) {
    updateCompany(id: $id, name: $name, address: $address) {
      ...CompanyView
    }
  }
  ${COMPANY_VIEW_FRAGMENT}
`;
