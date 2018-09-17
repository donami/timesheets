import React, { Component } from 'react';
import { CategoryForm } from '../components';
import { QuestionCategory } from '../store/models';
import { PageHeader } from '../../common';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { CREATE_CATEGORY } from '../store/mutations';

type Props = {
  // createCategory: (data: Partial<QuestionCategory>) => any;
  createCategory(options: any): void;
};

class CategoryAddPage extends Component<Props> {
  handleSubmit = (data: Partial<QuestionCategory>) => {
    // this.props.createCategory(data);
    this.props.createCategory({
      variables: { title: data.title, icon: data.icon },
    });
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

const enhance = compose(graphql(CREATE_CATEGORY, { name: 'createCategory' }));

export default enhance(CategoryAddPage);
