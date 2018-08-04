import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'genui';

import styled from '../../../styled/styled-components';
import { QuestionCategory, QuestionArticle } from '../store/models';

type Props = {
  category: QuestionCategory;
  article?: QuestionArticle;
};

const Breadcrumb: React.SFC<Props> = ({ category, article }) => {
  if (!category) {
    return null;
  }

  return (
    <Container>
      <Link to="/help">All Categories</Link>
      <Icon name="fas fa-angle-right" />
      <Link to={`/help/category/${category.id}`}>{category.title}</Link>

      {article && (
        <>
          <Icon name="fas fa-angle-right" />
          <Link to={`/help/${article.id}`}>{article.title}</Link>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;

  a {
    text-transform: uppercase;
    font-weight: 300;
    color: #4f5e6b;
    text-decoration: none;
    margin-right: 10px;
    font-size: 0.9em;

    &:hover {
      color: #242a30;
    }
  }

  i,
  svg {
    color: #999;
    margin-right: 10px;
  }
`;

export default Breadcrumb;
