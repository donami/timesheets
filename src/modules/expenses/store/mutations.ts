import gql from 'graphql-tag';

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation createExpense(
    $description: String!
    $ownerId: ID!
    $items: [ExpenseitemsExpenseItem!]
  ) {
    createExpense(description: $description, ownerId: $ownerId, items: $items) {
      __typename
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
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: ID!, $description: String) {
    updateExpense(id: $id, description: $description) {
      __typename
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
  }
`;

export const UPDATE_EXPENSE_ITEM = gql`
  mutation updateExpenseItem(
    $id: ID!
    $amount: Int
    $currency: String
    $expenseDate: String
    $expenseType: String
    $files: [String!]
  ) {
    updateExpenseItem(
      id: $id
      amount: $amount
      currency: $currency
      expenseDate: $expenseDate
      expenseType: $expenseType
      files: $files
    ) {
      __typename
      id
      expense {
        __typename
        id
      }
    }
  }
`;

export const CREATE_EXPENSE_ITEM = gql`
  mutation createExpenseItem(
    $expenseId: ID!
    $amount: Int!
    $currency: String
    $expenseDate: String!
    $expenseType: String!
    $files: [String!]
  ) {
    createExpenseItem(
      expenseId: $expenseId
      amount: $amount
      currency: $currency
      expenseDate: $expenseDate
      expenseType: $expenseType
      files: $files
    ) {
      __typename
      id
      expense {
        __typename
        id
      }
    }
  }
`;
