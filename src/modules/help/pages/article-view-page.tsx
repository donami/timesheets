import React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';

import {
  ArticleInfo,
  Breadcrumb,
  Search,
  ArticleFeedback,
} from '../components';
import { GET_ARTICLE } from '../store/queries';

type Props = {
  match: any;
  giveFeedback: (articleId: number, response: string) => any;
};
type DataProps = {
  loading: boolean;
  article: any;
};
type EnhancedProps = Props & DataProps;

const ArticleViewPage: React.SFC<EnhancedProps> = ({ article }) => (
  <div>
    <Search />

    {article.category && (
      <Breadcrumb category={article.category} article={article} />
    )}

    <ArticleInfo article={article} author={article.author} />

    <ArticleFeedback articleId={article.id} feedback={article.feedback} />
  </div>
);

const enhance = compose(
  graphql(GET_ARTICLE, {
    options: ({ match }: Props) => ({
      variables: { id: match.params.id },
    }),
    props: ({ data }: any) => ({
      article: data.Article,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(ArticleViewPage);
