import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, renderNothing, branch } from 'recompose';
import { graphql } from 'react-apollo';

import { ArticleList } from '../components';
import styled from '../../../styled/styled-components';

type Props = {
  query: string;
};
type DataProps = {
  results: any;
  loading: boolean;
};
type EnhancedProps = Props & DataProps;

class SearchResults extends Component<EnhancedProps> {
  render() {
    const { query, results } = this.props;

    if (!query) {
      return null;
    }

    if (query && results.length === 0) {
      return (
        <SearchLabel>
          Sorry, we couldn't find any articles for: <strong>{query}</strong>
        </SearchLabel>
      );
    }

    return (
      <>
        <SearchLabel>
          Search results for: <strong>{query}</strong>
        </SearchLabel>

        <ArticleList articles={results} />
      </>
    );
  }
}

const SearchLabel = styled.div`
  color: #8f919d;
  margin: 10px 0;
  font-size: 1.2em;
`;

const SEARCH_RESULTS = gql`
  query($query: String!) {
    allArticles(filter: { title_contains: $query }) {
      __typename
      id
      title
      teaser
      author {
        id
        image
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(SEARCH_RESULTS, {
    options: (props: EnhancedProps) => ({
      variables: {
        query: props.query || '',
      },
    }),
    props: ({ data }: any) => ({
      results: data.allArticles,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(SearchResults);
