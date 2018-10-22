import React from 'react';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';

import {
  ArticleInfo,
  Breadcrumb,
  Search,
  ArticleFeedback,
} from '../components';
import { GET_ARTICLE, SEARCH_QUERY } from '../store/queries';
import { PageLoader } from 'src/modules/ui';
import { NotFoundPage } from 'src/modules/common';

type Props = {
  match: any;
  giveFeedback: (articleId: number, response: string) => any;
};
type DataProps = {
  query: string;
  loading: boolean;
  article: any;
};
type EnhancedProps = Props & DataProps;

const ArticleViewPage: React.SFC<EnhancedProps> = ({ article, query }) => (
  <div>
    {!article ? (
      <NotFoundPage />
    ) : (
      <>
        <Search />

        {article.category && (
          <Breadcrumb category={article.category} article={article} />
        )}

        <ArticleInfo article={article} author={article.author} />

        <ArticleFeedback articleId={article.id} feedback={article.feedback} />
      </>
    )}
  </div>
);

const enhance = compose(
  graphql(SEARCH_QUERY, {
    props: ({ data }: any) => ({
      query: (data.helpSearch && data.helpSearch.value) || '',
    }),
  }),
  graphql(GET_ARTICLE, {
    options: ({ match }: Props) => ({
      variables: { id: match.params.id },
    }),
    props: ({ data }: any) => ({
      article: data.Article,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderComponent(PageLoader))
);

export default enhance(ArticleViewPage);
