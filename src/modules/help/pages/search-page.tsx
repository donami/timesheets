import React from 'react';

import { Search, SearchResults } from '../components';

type Props = {};

const SearchPage: React.SFC<Props> = () => (
  <div>
    <Search />

    <SearchResults />
  </div>
);

export default SearchPage;
