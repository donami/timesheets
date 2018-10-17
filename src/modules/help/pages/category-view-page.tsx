import React from 'react';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';

import { CategoryInfo, Breadcrumb, Search } from '../components';
import { GET_CATEGORY, SEARCH_QUERY } from '../store/queries';
import { PageLoader } from 'src/modules/ui';
import { NotFoundPage } from 'src/modules/common';

type Props = {
  match: any;
};
type DataProps = {
  loading: boolean;
  query: string;
  category: any;
};
type EnhancedProps = Props & DataProps;

const CategoryViewPage: React.SFC<EnhancedProps> = ({ category, query }) =>
  category ? (
    <>
      <Search />
      <Breadcrumb category={category} />
      <CategoryInfo category={category} articles={category.articles} />
    </>
  ) : (
    <NotFoundPage />
  );

const enhance = compose<EnhancedProps, Props>(
  graphql(SEARCH_QUERY, {
    props: ({ data }: any) => ({
      query: (data.helpSearch && data.helpSearch.value) || '',
    }),
  }),
  graphql(GET_CATEGORY, {
    options: (props: any) => ({
      variables: { id: props.match.params.id },
    }),
    props: ({ data }: any) => ({
      loading: data.loading,
      category: data.Category,
    }),
  }),
  branch<EnhancedProps>(props => props.loading, renderComponent(PageLoader))
);

export default enhance(CategoryViewPage);
