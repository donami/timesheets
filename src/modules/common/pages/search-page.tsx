import React, { Component } from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { PageHeader, SearchResult } from '../components';
import styled from '../../../styled/styled-components';
import { Redirect } from 'react-router';

type Props = {};
type DataProps = {
  loading: boolean;
  query: any;
  users: any;
};
type EnhancedProps = Props & DataProps;

type State = {};
class SearchPage extends Component<EnhancedProps, State> {
  render() {
    const { users, query } = this.props;
    const regex = new RegExp(query, 'i');

    if (!query) {
      return <Redirect to="/" />;
    }

    const results = users.filter((user: any) => {
      return user.email.match(regex);
    });

    return (
      <div>
        <PageHeader>Search results</PageHeader>

        {query.length > 0 && (
          <SearchResultsInfo>
            Your search for "<em>{query}</em>" resulted in{' '}
            <strong>{results.length}</strong> matches.
          </SearchResultsInfo>
        )}

        {query.length > 0 &&
          results.map((result: any) => (
            <SearchResult key={result.id} item={result} />
          ))}
      </div>
    );
  }
}

const SEARCH_QUERY = gql`
  query {
    search @client {
      __typename
      value
    }
    allUsers {
      id
      firstName
      lastName
      email
      disabled
      image {
        id
        name
        url
      }
    }
  }
`;

const enhance = compose(
  graphql(SEARCH_QUERY, {
    props: ({ data }: any) => ({
      query: data.search && data.search.value,
      users: data.allUsers || [],
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(SearchPage);

const SearchResultsInfo = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
`;
