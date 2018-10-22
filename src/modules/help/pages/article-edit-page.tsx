import React from 'react';
import { compose, branch, renderNothing, withHandlers } from 'recompose';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import { ArticleForm } from '../components';
import { PageHeader } from '../../common';
import { ARTICLE_FRAGMENT, CATEGORY_ITEM_FRAGMENT } from '../store/queries';
import { UPDATE_ARTICLE } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';

type Props = {
  match: any;
  userId: number;
};
type DataProps = {
  article: any;
  loading: boolean;
};
type HandlerProps = {
  onSave(data: any): void;
};
type EnhancedProps = Props & DataProps & WithToastrProps & HandlerProps;

const ArticleEditPage: React.SFC<EnhancedProps> = ({
  article,
  onSave,
  match,
}) => (
  <Query query={ARTICLE_QUERY} variables={{ id: match.params.id }}>
    {({ loading, data }) => {
      if (loading) {
        return null;
      }

      return (
        <div>
          <PageHeader>Edit Article</PageHeader>

          <Mutation mutation={UPDATE_ARTICLE}>
            {updateArticle => (
              <ArticleForm
                categories={data.allCategories || []}
                onSubmit={onSave}
                article={data.Article}
                updateArticle={updateArticle}
                category={data.Article.category}
              />
            )}
          </Mutation>
        </div>
      );
    }}
  </Query>
);

const ARTICLE_QUERY = gql`
  query($id: ID!) {
    Article(id: $id) {
      ...articleFragment
    }
    allCategories {
      ...categoryItemFragment
    }
  }
  ${ARTICLE_FRAGMENT}
  ${CATEGORY_ITEM_FRAGMENT}
`;

const enhance = compose(
  withToastr,
  withHandlers({
    onSave: ({ addToast, history }) => async (data: any) => {
      addToast('Updated!', 'Article was updated.', 'positive');
      history.goBack();
    },
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(ArticleEditPage);
