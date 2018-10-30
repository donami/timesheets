import React from 'react';
import { compose, withHandlers } from 'recompose';
import { graphql, Mutation, Query } from 'react-apollo';

import { PageHeader } from '../../common';
import { GET_CATEGORIES } from '../store/queries';
import { CREATE_ARTICLE } from '../store/mutations';
import { ArticleForm } from '../components';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { PageLoader } from '../../ui';
import { CompanyContext } from '../../common/components/routing';

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
  user: any;
};

type EnhancedProps = Props & DataProps & HandlerProps & WithToastrProps;

const ArticleAddPage: React.SFC<EnhancedProps> = ({ onSubmit, user }) => (
  <div>
    <CompanyContext.Consumer>
      {({ company }: any) => (
        <Query query={GET_CATEGORIES} variables={{ companyId: company.id }}>
          {({ data, loading }) => {
            if (loading) {
              return <PageLoader />;
            }
            return (
              <>
                <PageHeader>Publish new article</PageHeader>
                <Mutation mutation={CREATE_ARTICLE}>
                  {createArticle => (
                    <ArticleForm
                      user={user}
                      createArticle={createArticle}
                      categories={data.allCategories || []}
                      onSubmit={onSubmit}
                    />
                  )}
                </Mutation>
              </>
            );
          }}
        </Query>
      )}
    </CompanyContext.Consumer>
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({ user: data.user }),
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
