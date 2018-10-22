import React from 'react';

import { QuestionArticle } from '../store/models';
import styled from '../../../styled/styled-components';
import ArticleListItem from './article-list-item';

type Props = {
  articles: QuestionArticle[];
};

class ArticleList extends React.Component<Props> {
  render() {
    const { articles } = this.props;

    return (
      <Container>
        {articles.map(article => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  border: #ccc 1px solid;
`;

export default ArticleList;
