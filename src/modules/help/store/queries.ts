import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export interface AllCategoriesData {
  // allPeople: {
  //   // tslint:disable-next-line:prefer-array-literal
  //   people: Array<{ name: string }>;
  // };
}

export interface AllCategoriesVariables {}

export class GetCategoriesQuery extends Query<
  AllCategoriesData,
  AllCategoriesVariables
> {}

export const GET_CATEGORIES = gql`
  query allCategories {
    allCategories {
      id
      title
      icon
      articles {
        id
        title
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query allArticles {
    allArticles {
      id
      title
    }
  }
`;

export const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    Category(id: $id) {
      id
      title
      icon
      articles {
        id
        title
        teaser
        author {
          id
          firstName
          lastName
          image
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  query getArticle($id: ID!) {
    Article(id: $id) {
      id
      title
      teaser
      body
      createdAt
      updatedAt
      author {
        id
        firstName
        lastName
        image
      }
      category {
        id
        title
      }
      feedback {
        id
        positive
        negative
        neutral
      }
    }
  }
`;
