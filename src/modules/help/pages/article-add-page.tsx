import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ArticleForm } from '../components';
import { QuestionArticle, QuestionCategory } from '../store/models';
import { createArticle, fetchCategoriesIfNeeded } from '../store/actions';
import { getAuthedUserId } from '../../auth/store/selectors';
import { getCategories } from '../store/selectors';
import { PageHeader } from '../../common';

type Props = {
  createArticle: (
    data: Partial<QuestionArticle>,
    userId: number,
    categoryId: number
  ) => any;
  fetchCategoriesIfNeeded: () => any;
  categories: QuestionCategory[];
  userId: number;
};

class ArticleAddPage extends Component<Props> {
  componentWillMount() {
    this.props.fetchCategoriesIfNeeded();
  }

  handleSubmit = (data: Partial<QuestionArticle>, categoryId: number) => {
    this.props.createArticle(data, this.props.userId, categoryId);
  };

  render() {
    return (
      <div>
        <PageHeader>Publish new article</PageHeader>
        <ArticleForm
          categories={this.props.categories}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    userId: getAuthedUserId(state),
    categories: getCategories(state),
  }),
  (dispatch: any) =>
    bindActionCreators({ createArticle, fetchCategoriesIfNeeded }, dispatch)
)(ArticleAddPage);
