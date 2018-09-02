import React from 'react';
import MarkdownIt from 'markdown-it';

import { QuestionArticle } from '../store/models';
import styled from '../../../styled/styled-components';
import MetaInfo from './meta-info';
import { DEFAULT_USER_IMAGE } from '../../../config/constants';
import { User } from '../../users/store/models';

type Props = {
  article: QuestionArticle;
  author: User;
};

class ArticleInfo extends React.Component<Props> {
  render() {
    const md = new MarkdownIt();
    const { article, author } = this.props;

    return (
      <Container>
        <h2>{article.title}</h2>

        <Teaser>{article.teaser}</Teaser>

        <MetaInfo
          avatar={author.image || DEFAULT_USER_IMAGE}
          createdAt={article.createdAt}
          authorName={author.fullName}
        />

        <ArticleBody
          dangerouslySetInnerHTML={{ __html: md.render(article.body) }}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  border: #ccc 1px solid;
  padding: 20px;
  background-color: #fff;

  h2 {
    font-weight: 300;
    text-transform: uppercase;
    color: #2ab4c0;
    margin-top: 0;
  }
`;

const Teaser = styled.p`
  font-size: 1.1em;
  color: #8f919d;
`;

const ArticleBody = styled.div`
  margin-top: 20px;
`;

export default ArticleInfo;
