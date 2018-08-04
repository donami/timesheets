import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getArticleSearchResults,
  getArticleSearchQuery,
} from '../store/selectors';
import { QuestionArticle } from '../store/models';
import { ArticleList } from '../components';
import styled from '../../../styled/styled-components';

type Props = {
  results: QuestionArticle[];
  query: string;
};

class SearchResults extends Component<Props> {
  render() {
    const { results, query } = this.props;

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

export default connect((state: any) => ({
  results: getArticleSearchResults(state),
  query: getArticleSearchQuery(state),
}))(SearchResults);
