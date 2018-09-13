import React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { CategoryForm } from '../components';
import { QuestionCategory } from '../store/models';
import { updateCategory, selectCategory } from '../store/actions';
import { getSelectedCategory } from '../store/selectors';
import { PageHeader } from '../../common';

type Props = {
  match: any;
  category: QuestionCategory;
  updateCategory: (categoryId: number, data: Partial<QuestionCategory>) => any;
  selectCategory: (categoryId: number) => any;
  onSubmit: (props: any) => (event: any) => any;
};

const CategoryEditPage: React.SFC<Props> = ({ category, onSubmit }) => (
  <div>
    <PageHeader>Edit Category</PageHeader>
    <CategoryForm onSubmit={onSubmit} category={category} />
  </div>
);

const enhance = compose(
  connect(
    (state: any) => ({
      category: getSelectedCategory(state),
    }),
    (dispatch: any) =>
      bindActionCreators({ updateCategory, selectCategory }, dispatch)
  ),
  lifecycle<Props, {}>({
    componentWillMount() {
      const { match } = this.props;

      if (match.params.id) {
        this.props.selectCategory(+match.params.id);
      }
    },
  }),
  withHandlers<Props, {}>({
    onSubmit: props => (data: any) => {
      if (!data.id) {
        return;
      }

      props.updateCategory(data.id, data);
    },
  })
);

export default enhance(CategoryEditPage);
