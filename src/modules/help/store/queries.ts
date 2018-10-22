import gql from 'graphql-tag';

export const CATEGORY_ITEM_FRAGMENT = gql`
  fragment categoryItemFragment on Category {
    __typename
    id
    title
    icon
    articles {
      id
      title
    }
  }
`;

export const GET_CATEGORIES = gql`
  query allCategories {
    allCategories {
      ...categoryItemFragment
    }
  }
  ${CATEGORY_ITEM_FRAGMENT}
`;

export const GET_ARTICLES = gql`
  query allArticles {
    allArticles {
      id
      title
      feedback {
        id
      }
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
          image {
            __typename
            id
            name
            url
          }
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
        image {
          __typename
          id
          name
          url
        }
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

export const ARTICLE_FRAGMENT = gql`
  fragment articleFragment on Article {
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
      image {
        __typename
        id
        name
        url
      }
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
`;

export const SEARCH_QUERY = gql`
  query {
    helpSearch @client {
      __typename
      value
    }
  }
`;
