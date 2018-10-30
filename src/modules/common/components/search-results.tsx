import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from '../../../styled/styled-components';
import SearchResult from './search-result';
import { CompanyContext } from './routing';

type Props = {
  query: string;
};

class SearchResults extends Component<Props> {
  render() {
    const { query } = this.props;
    return (
      <CompanyContext.Consumer>
        {({ company }: any) => (
          <Query
            query={SEARCH_RESULTS}
            variables={{ query, companyId: company.id }}
          >
            {({ data, loading }) => {
              if (loading) {
                return null;
              }

              const results = data.allUsers;

              if (results.length === 0) {
                return (
                  <SearchResultsInfo>
                    Your search for "<em>{query}</em>" resulted in{' '}
                    <strong>{results.length}</strong> matches.
                  </SearchResultsInfo>
                );
              }

              return (
                <div>
                  {results.map((item: any) => (
                    <SearchResult key={item.id} item={item} />
                  ))}
                </div>
              );
            }}
          </Query>
        )}
      </CompanyContext.Consumer>
    );
  }
}

const SEARCH_RESULTS = gql`
  query($query: String!, $companyId: ID!) {
    allUsers(
      filter: {
        OR: [
          { firstName_contains: $query }
          { lastName_contains: $query }
          { email_contains: $query }
        ]
        company: { id: $companyId }
      }
    ) {
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

export default SearchResults;

const SearchResultsInfo = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
`;
