import React from 'react';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import { PageHeader } from '../../common';
import { GET_CATEGORIES } from '../store/queries';
import { CREATE_ARTICLE } from '../store/mutations';
import { ArticleForm } from '../components';
import { GET_AUTHED_USER, LOGGED_IN_USER } from '../../auth/store/queries';
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
  createArticle(options: any): Promise<any>;
  categories: any[];
  user: any;
};

type EnhancedProps = Props & DataProps & HandlerProps & WithToastrProps;

const ArticleAddPage: React.SFC<EnhancedProps> = ({ categories, onSubmit }) => (
  <div>
    <PageHeader>Publish new article</PageHeader>
    <ArticleForm categories={categories} onSubmit={onSubmit} />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  graphql(CREATE_ARTICLE, { name: 'createArticle' }),
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({ user: data.loggedInUser }),
  }),
  graphql(GET_CATEGORIES, {
    props: ({ data }: any) => ({ categories: data.allCategories || [] }),
  }),
  withHandlers<Props, HandlerProps>({
    onSubmit: ({
      createArticle,
      user,
      history,
      addToast,
    }: EnhancedProps) => async (data: any) => {
      await createArticle({
        variables: { ...data, authorId: user.id },
      });
      await addToast('Published', 'Article was published.', 'positive');
      history.goBack();
    },
  })
);

export default enhance(ArticleAddPage);
