import React from 'react';
import { Icon } from 'genui';

import styled from '../../../styled/styled-components';
import { QuestionCategory, QuestionArticle } from '../store/models';
import { ArticleList } from '../components';
import { User } from '../../users/store/models';

type Props = {
  category: QuestionCategory;
  articles: QuestionArticle[];
};

const CategoryInfo: React.SFC<Props> = ({ category, articles }) => {
  return (
    <div>
      <Top>
        <Left>
          <Icon name={category.icon} size="3x" color="green" />
        </Left>

        <Right>
          <h3>{category.title}</h3>

          <div>{category.articles.length} articles in this collection</div>
        </Right>
      </Top>

      <ArticleList articles={articles} />
    </div>
  );
};

const Top = styled.div`
  display: flex;
  padding-left: 20px;
  background: #f9f9f9;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 0;
    margin-bottom: 10px;
    color: #21ba45;
    font-size: 1.4em;
  }
`;

const Left = styled.div`
  flex: 1;
  max-width: 80px;
  align-items: center;
  display: flex;
`;

const Right = styled.div`
  flex: 1;
  height: 100px;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

export default CategoryInfo;
