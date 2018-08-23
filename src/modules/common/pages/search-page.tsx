import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../users/store/selectors';
import { getSearchQuery } from '../store/selectors';
import { PageHeader, SearchResult } from '../components';
import { User } from '../../users/store/models';
import styled from '../../../styled/styled-components';

type Props = {
  query: string;
  users: User[];
};
type State = {};

class SearchPage extends Component<Props, State> {
  render() {
    const { users, query } = this.props;

    const regex = new RegExp(query, 'i');

    const results = users.filter(user => {
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
          results.map(result => <SearchResult key={result.id} item={result} />)}
      </div>
    );
  }
}

export default connect((state: any) => ({
  users: getUsers(state),
  query: getSearchQuery(state),
}))(SearchPage);

const SearchResultsInfo = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
`;
