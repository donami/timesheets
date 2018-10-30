import gql from 'graphql-tag';

export const GET_COMPANY = gql`
  query($companyId: ID) {
    allCompanies(filter: { id: $companyId }) {
      id
      name
      address
      createdAt
      updatedAt
      subscriptionStatus
      subscriptionEnds
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
  }
`;
