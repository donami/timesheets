import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router';

import { ArticleList } from '../components';
import styled from '../../../styled/styled-components';
import SearchLoader from './search-loader';

type Props = {
  query: string;
};

class SearchResults extends Component<Props> {
  render() {
    const { query } = this.props;

    if (!query) {
      return <Redirect to="/help" />;
    }

    return (
      <Query query={SEARCH_RESULTS} variables={{ query }}>
        {({ data, loading }) => {
          if (loading) {
            return <SearchLoader />;
          }

          const results = data.allArticles;

          if (results.length === 0) {
            return (
              <Box>
                <SearchLabel>
                  Sorry, we couldn't find any articles matching:{' '}
                  <strong>{query}</strong>
                </SearchLabel>
              </Box>
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
        }}
      </Query>
    );
  }
}

const Box = styled.div`
  border-radius: 5px;
  background: #fff;
  border: #e8e8e8 1px solid;
  padding: 10px;
  margin: 10px 0;
`;

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
        image {
          id
        }
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

export default SearchResults;
