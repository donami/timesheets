import React, { Component } from 'react';
import { CategoryForm } from '../components';
import { QuestionCategory } from '../store/models';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCategory, selectCategory } from '../store/actions';
import { getSelectedCategory } from '../store/selectors';
import { PageHeader } from '../../common';

type Props = {
  match: any;
  category: QuestionCategory;
  updateCategory: (categoryId: number, data: Partial<QuestionCategory>) => any;
  selectCategory: (categoryId: number) => any;
};

class CategoryEditPage extends Component<Props> {
  componentWillMount() {
    const { match } = this.props;

    if (match.params.id) {
      this.props.selectCategory(+match.params.id);
    }
  }

  handleSubmit = (data: Partial<QuestionCategory>) => {
    if (!data.id) {
      return;
    }

    this.props.updateCategory(data.id, data);
  };

  render() {
    return (
      <div>
        <PageHeader>Edit Category</PageHeader>
        <CategoryForm
          onSubmit={this.handleSubmit}
          category={this.props.category}
        />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    category: getSelectedCategory(state),
  }),
  (dispatch: any) =>
    bindActionCreators({ updateCategory, selectCategory }, dispatch)
)(CategoryEditPage);
