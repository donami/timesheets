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
    $itemsIds: [ID!]
  ) {
    createExpense(
      description: $description
      ownerId: $ownerId
      items: $items
      itemsIds: $itemsIds
    ) {
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
  mutation updateExpense($id: ID!, $description: String, $itemsIds: [ID!]!) {
    updateExpense(id: $id, description: $description, itemsIds: $itemsIds) {
      __typename
      id
      description
      owner {
        id
        firstName
        lastName
      }
      items {
        __typename
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
    $amount: Int!
    $currency: String
    $expenseDate: String!
    $expenseType: String!
    $filesIds: [ID!]
  ) {
    updateOrCreateExpenseItem(
      update: {
        id: $id
        amount: $amount
        currency: $currency
        expenseDate: $expenseDate
        expenseType: $expenseType
        filesIds: $filesIds
      }
      create: {
        amount: $amount
        currency: $currency
        expenseDate: $expenseDate
        expenseType: $expenseType
        filesIds: $filesIds
      }
    ) {
      __typename
      id
      expense {
        __typename
        id
        items {
          __typename
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
      files {
        __typename
        id
        url
        name
      }
    }
  }
`;

export const CREATE_EXPENSE_ITEM = gql`
  mutation createExpenseItem(
    $expenseId: ID
    $amount: Int!
    $currency: String
    $expenseDate: String!
    $expenseType: String!
    $files: [ExpenseItemfilesFile!]
    $filesIds: [ID!]
  ) {
    createExpenseItem(
      expenseId: $expenseId
      amount: $amount
      currency: $currency
      expenseDate: $expenseDate
      expenseType: $expenseType
      files: $files
      filesIds: $filesIds
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
