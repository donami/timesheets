import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'genui';

import { QuestionCategory } from '../store/models';
import styled from '../../../styled/styled-components';
import { Avatar } from '../../common';

type Props = {
  category: QuestionCategory;
};

const Category: React.SFC<Props> = ({ category }) => {
  return (
    <Container to={`/help/category/${category.id}`}>
      <LeftNode>
        <Icon name="far fa-comment" size="5x" />
      </LeftNode>
      <RightNode>
        <h3>{category.title}</h3>
        {category.articles.length} articles in this collection
        {/* <Avatar /> */}
      </RightNode>
    </Container>
  );
};

const Container = styled(Link)`
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.03);
  border: 1px solid #d4dadf;
  border-radius: 4px;
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  color: inherit;

  h3 {
    font-weight: 300;
    text-transform: uppercase;
    color: #2ab4c0;
  }

  i,
  svg {
    color: #2ab4c0;
  }

  img {
    max-width: 48px;
  }

  &:hover {
    border: 1px solid rgba(136, 149, 162, 0.35);
    background-color: #fcfcfc;
  }
`;

const LeftNode = styled.div`
  flex: 1;
  max-width: 80px;
`;

const RightNode = styled.div`
  flex: 1;
`;

export default Category;
