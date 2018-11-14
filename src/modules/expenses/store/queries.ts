import gql from 'graphql-tag';

export const EXPENSE_LIST_ITEM_FRAGMENT = gql`
  fragment ExpenseListItem on Expense {
    id
    description
    owner {
      id
      firstName
      lastName
    }
    createdAt
    updatedAt
    dateApproved
    status
  }
`;

export const GET_EXPENSES = gql`
  query allExpenses($companyId: ID!, $ownerId: ID) {
    allExpenses(
      filter: {
        owner: { AND: [{ id: $ownerId }, { company: { id: $companyId } }] }
      }
    ) {
      ...ExpenseListItem
    }
  }
  ${EXPENSE_LIST_ITEM_FRAGMENT}
`;

export const GET_EXPENSE = gql`
  query getExpense($id: ID!) {
    Expense(id: $id) {
      id
      description
      owner {
        id
        firstName
        lastName
      }
      createdAt
      updatedAt
      dateApproved
      status
      items {
        id
        expenseType
        expenseDate
        amount
        currency
        attachment
        files {
          id
          name
          url
        }
      }
    }
  }
`;
