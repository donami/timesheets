import React, { Component } from 'react';

import { Search, SearchResults } from '../components';

type Props = {};

class SearchPage extends Component<Props> {
  render() {
    return (
      <div>
        <Search />

        <SearchResults />
      </div>
    );
  }
}

export default SearchPage;
