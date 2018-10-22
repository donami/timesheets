import React from 'react';
import { compose, withHandlers } from 'recompose';
import { graphql, Mutation } from 'react-apollo';

import { PageHeader } from '../../common';
import { GET_CATEGORIES } from '../store/queries';
import { CREATE_ARTICLE } from '../store/mutations';
import { ArticleForm } from '../components';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { withToastr, WithToastrProps } from '../../common/components/toastr';

type Props = {
  history: any;
};

type FormModel = {
  teaser: string;
  title: string;
  body: string;
  categoryId?: any;
};

type HandlerProps = {
  onSubmit: (data: FormModel) => void;
};

type DataProps = {
  categories: any[];
  user: any;
};

type EnhancedProps = Props & DataProps & HandlerProps & WithToastrProps;

const ArticleAddPage: React.SFC<EnhancedProps> = ({
  categories,
  onSubmit,
  user,
}) => (
  <div>
    <PageHeader>Publish new article</PageHeader>
    <Mutation mutation={CREATE_ARTICLE}>
      {createArticle => (
        <ArticleForm
          user={user}
          createArticle={createArticle}
          categories={categories}
          onSubmit={onSubmit}
        />
      )}
    </Mutation>
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({ user: data.user }),
  }),
  graphql(GET_CATEGORIES, {
    props: ({ data }: any) => ({ categories: data.allCategories || [] }),
  }),
  withHandlers<Props, HandlerProps>({
    onSubmit: ({ user, history, addToast }: EnhancedProps) => async (
      data: any
    ) => {
      await addToast('Published', 'Article was published.', 'positive');
      history.goBack();
    },
  })
);

export default enhance(ArticleAddPage);
