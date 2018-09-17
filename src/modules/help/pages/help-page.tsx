import React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';

import { Search, Category } from '../components';
import { GET_CATEGORIES } from '../store/queries';

type Props = {};
type DataProps = {
  categories: any[];
  loading: boolean;
};
type EnhancedProps = Props & DataProps;

const HelpPage: React.SFC<EnhancedProps> = ({ categories }) => (
  <div>
    <Search />

    {categories.map(category => (
      <Category key={category.id} category={category} />
    ))}
  </div>
);

const enhance = compose<any, any>(
  graphql(GET_CATEGORIES, {
    props: ({ data }: any) => ({
      categories: data.allCategories,
      loading: data.loading,
    }),
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(HelpPage);
