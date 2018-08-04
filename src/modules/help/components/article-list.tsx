import React from 'react';
import { QuestionArticle } from '../store/models';
import styled from '../../../styled/styled-components';
import ArticleListItem from './article-list-item';
import { connect } from 'react-redux';
import { getUserEntities } from '../../users/store/selectors';
import { User } from '../../users/store/models';

type Props = {
  articles: QuestionArticle[];
  usersById: { [key: number]: User };
};

class ArticleList extends React.Component<Props> {
  render() {
    const { articles, usersById } = this.props;

    const articlesWithAuthors = articles.map(
      (article: QuestionArticle & { author: number }) => ({
        ...article,
        author: usersById[article.author],
      })
    );

    return (
      <Container>
        {articlesWithAuthors.map(article => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  border: #ccc 1px solid;
`;

export default connect((state: any) => ({ usersById: getUserEntities(state) }))(
  ArticleList
);
