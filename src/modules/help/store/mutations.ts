import gql from 'graphql-tag';
import { CATEGORY_ITEM_FRAGMENT } from './queries';

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($title: String!, $icon: String!, $companyId: ID!) {
    createCategory(title: $title, icon: $icon, companyId: $companyId) {
      ...categoryItemFragment
    }
  }
  ${CATEGORY_ITEM_FRAGMENT}
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      __typename
      id
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle(
    $body: String!
    $teaser: String!
    $title: String!
    $authorId: ID!
    $categoryId: ID!
  ) {
    createArticle(
      body: $body
      teaser: $teaser
      title: $title
      authorId: $authorId
      categoryId: $categoryId
      feedback: { positive: 0, negative: 0, neutral: 0 }
    ) {
      id
      title
      category {
        id
        title
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $icon: String!, $title: String!) {
    updateCategory(id: $id, title: $title, icon: $icon) {
      id
      title
      icon
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $id: ID!
    $title: String
    $body: String
    $teaser: String
    $categoryId: ID
  ) {
    updateArticle(
      id: $id
      title: $title
      body: $body
      teaser: $teaser
      categoryId: $categoryId
    ) {
      id
      title
      teaser
      body
      category {
        id
        title
      }
    }
  }
`;

export const UPDATE_FEEDBACK = gql`
  mutation updateFeedback(
    $id: ID!
    $positive: Int
    $neutral: Int
    $negative: Int
  ) {
    updateFeedback(
      id: $id
      positive: $positive
      neutral: $neutral
      negative: $negative
    ) {
      id
      neutral
      positive
      negative
      article {
        id
      }
    }
  }
`;
