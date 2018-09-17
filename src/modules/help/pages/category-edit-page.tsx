import React from 'react';
import {
  compose,
  withHandlers,
  lifecycle,
  renderComponent,
  branch,
} from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { CategoryForm } from '../components';
import { QuestionCategory } from '../store/models';
import { updateCategory, selectCategory } from '../store/actions';
import { getSelectedCategory } from '../store/selectors';
import { PageHeader } from '../../common';
import { graphql } from 'react-apollo';
import { GET_CATEGORY } from '../store/queries';
import { UPDATE_CATEGORY } from '../store/mutations';

type Props = {
  match: any;
  history: any;
  updateCategory: (options: any) => any;
  onSubmit: (props: any) => (event: any) => any;
};

type DataProps = {
  loading: boolean;
  category: any;
};

type EnhancedProps = Props & DataProps;

const IsLoading = () => <div>Loading</div>;

const CategoryEditPage: React.SFC<EnhancedProps> = ({ category, onSubmit }) => (
  <div>
    <PageHeader>Edit Category</PageHeader>
    <CategoryForm onSubmit={onSubmit} category={category} />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_CATEGORY, {
    options: (props: any) => {
      return {
        variables: { id: props.match.params.id },
      };
    },
    props: ({ data }: any) => ({
      loading: data.loading,
      category: data.Category,
    }),
  }),
  graphql(UPDATE_CATEGORY, {
    name: 'updateCategory',
  }),
  withHandlers<Props, {}>({
    onSubmit: props => (data: any) => {
      if (!data.id) {
        return;
      }

      props
        .updateCategory({
          variables: { id: data.id, icon: data.icon, title: data.title },
        })
        .then(() => {
          props.history.goBack();
        });
    },
  }),
  branch<EnhancedProps>(props => props.loading, renderComponent(IsLoading))
);

export default enhance(CategoryEditPage);
