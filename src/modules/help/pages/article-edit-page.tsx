import React from 'react';
import { compose, branch, renderNothing, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import { ArticleForm } from '../components';
import { PageHeader } from '../../common';
import { GET_ARTICLE, GET_CATEGORIES } from '../store/queries';
import { UPDATE_ARTICLE } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';

type Props = {
  match: any;
  userId: number;
};
type DataProps = {
  article: any;
  loading: boolean;
  categories: any[];
  updateArticle(options: any): any;
};
type HandlerProps = {
  onSave(data: any): void;
};
type EnhancedProps = Props & DataProps & WithToastrProps & HandlerProps;

const ArticleEditPage: React.SFC<EnhancedProps> = ({
  categories,
  article,
  onSave,
}) => (
  <div>
    <PageHeader>Edit Article</PageHeader>

    <ArticleForm
      categories={categories}
      onSubmit={onSave}
      article={article}
      category={article.category}
    />
  </div>
);

const enhance = compose(
  withToastr,
  graphql(GET_ARTICLE, {
    options: ({ match }: Props) => ({
      variables: { id: match.params.id },
    }),
    props: ({ data }: any) => ({
      article: data.Article,
      loading: data.loading,
    }),
  }),
  graphql(GET_CATEGORIES, {
    props: ({ data }: any) => ({
      categories: data.allCategories || [],
    }),
  }),
  graphql(UPDATE_ARTICLE, { name: 'updateArticle' }),
  withHandlers({
    onSave: ({ updateArticle, addToast, history }) => async (data: any) => {
      await updateArticle({
        variables: {
          id: data.id,
          title: data.title,
          body: data.body,
          teaser: data.teaser,
          categoryId: data.categoryId,
        },
      });
      await addToast('Updated!', 'Article was updated.', 'positive');
      history.goBack();
    },
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(ArticleEditPage);
