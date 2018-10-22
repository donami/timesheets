import React, { Component } from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

import { PageHeader, SearchResult } from '../components';
import styled from '../../../styled/styled-components';
import { Redirect } from 'react-router';
import SearchResults from '../components/search-results';

type Props = {};

type State = {};
class SearchPage extends Component<Props, State> {
  render() {
    return (
      <Query query={SEARCH_QUERY}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          const query = data.search.value;

          if (query.length === 0) {
            return <Redirect to="/" />;
          }

          return (
            <div>
              <PageHeader>Search results</PageHeader>
              <SearchResults query={query} />
            </div>
          );
        }}
      </Query>
    );
  }
}

const SEARCH_QUERY = gql`
  query {
    search @client {
      __typename
      value
    }
  }
`;

export default SearchPage;
