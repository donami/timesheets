import React, { Component } from 'react';
import { CategoryForm } from '../components';
import { QuestionCategory } from '../store/models';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createCategory } from '../store/actions';
import { PageHeader } from '../../common';

type Props = {
  createCategory: (data: Partial<QuestionCategory>) => any;
};

class CategoryAddPage extends Component<Props> {
  handleSubmit = (data: Partial<QuestionCategory>) => {
    this.props.createCategory(data);
  };

  render() {
    return (
      <div>
        <PageHeader>Create new category</PageHeader>
        <CategoryForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default connect(
  undefined,
  (dispatch: any) => bindActionCreators({ createCategory }, dispatch)
)(CategoryAddPage);
