import React from 'react';
import { Link } from 'react-router-dom';

import { QuestionArticle } from '../store/models';
import styled from '../../../styled/styled-components';
import { DEFAULT_USER_IMAGE } from '../../../config/constants';
import MetaInfo from './meta-info';

type Props = {
  article: QuestionArticle;
};

const ArticleListItem: React.SFC<Props> = ({ article }) => {
  return (
    <Container to={`/help/${article.id}`}>
      <h3>{article.title}</h3>
      <p>{article.teaser}</p>

      <MetaInfo
        avatar={article.author.image || DEFAULT_USER_IMAGE}
        authorName={article.author.fullName}
        createdAt={article.createdAt}
      />
    </Container>
  );
};

const Container = styled(Link)`
  padding: 20px 10px;
  border-bottom: #ccc 1px solid;
  display: block;
  color: inherit;
  text-decoration: none;

  h3 {
    font-weight: 300;
    color: #2ab4c0;
    text-transform: uppercase;
    margin: 0;
  }

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: #fcfcfc;
  }
`;

export default ArticleListItem;
