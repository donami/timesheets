import React from 'react';
import { compose } from 'recompose';
import { graphql, Query } from 'react-apollo';

import { Search, SearchResults } from '../components';
import { SEARCH_QUERY } from '../store/queries';

type Props = {};

const SearchPage: React.SFC<Props> = () => (
  <div>
    <Search />

    <Query query={SEARCH_QUERY}>
      {({ data, loading }) => {
        if (loading) {
          return null;
        }

        const query = data.helpSearch.value;

        return <SearchResults query={query} />;
      }}
    </Query>
  </div>
);

export default SearchPage;
