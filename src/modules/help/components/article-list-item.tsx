import React from 'react';
import { Link } from 'react-router-dom';

import styled from '../../../styled/styled-components';
import { DEFAULT_USER_IMAGE } from '../../../config/constants';
import MetaInfo from './meta-info';

type Props = {
  article: any;
};

const ArticleListItem: React.SFC<Props> = ({ article }) => {
  return (
    <Container to={`/help/${article.id}`}>
      <h3>{article.title}</h3>
      <p>{article.teaser}</p>

      <MetaInfo
        avatar={article.author.image || DEFAULT_USER_IMAGE}
        authorName={`${article.author.firstName} ${article.author.lastName}`}
        createdAt={article.createdAt}
      />
    </Container>
  );
};

export default ArticleListItem;

const Container = styled(Link)`
  padding: 20px 10px;
  border-bottom: #ccc 1px solid;
  display: block;
  color: inherit;
  text-decoration: none;
  background-color: #fff;

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
