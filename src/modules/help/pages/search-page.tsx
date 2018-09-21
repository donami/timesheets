import React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { Search, SearchResults } from '../components';
import { SEARCH_QUERY } from '../store/queries';

type Props = {};
type DataProps = { query: string };
type EnhancedProps = Props & DataProps;

const SearchPage: React.SFC<EnhancedProps> = ({ query }) => (
  <div>
    <Search query={query} />

    <SearchResults query={query} />
  </div>
);

const enhance = compose(
  graphql(SEARCH_QUERY, {
    props: ({ data }: any) => ({
      query: (data.helpSearch && data.helpSearch.value) || '',
    }),
  })
);

export default enhance(SearchPage);
