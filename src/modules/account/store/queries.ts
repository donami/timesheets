import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Company } from './types';

type GetCompanyQuery = {
  Company: Company;
};

export class CompanyQuery extends Query<
  GetCompanyQuery,
  GetCompanyQueryVariables
> {}

type GetCompanyQueryVariables = {
  id: string;
};

export const COMPANY_VIEW_FRAGMENT = gql`
  fragment CompanyView on Company {
    id
    name
    address
    createdAt
    updatedAt
    user {
      id
    }
    image {
      id
      url
    }
    invoices {
      id
      createdAt
      updatedAt
      status
      amount
      file
    }
  }
`;

export const GET_COMPANIES_BY_USER_ID = gql`
  query($userId: ID!) {
    allCompanies(filter: { user: { id: $userId } }) {
      ...CompanyView
    }
  }
  ${COMPANY_VIEW_FRAGMENT}
`;
