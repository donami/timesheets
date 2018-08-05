import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ArticleForm } from '../components';
import { QuestionArticle, QuestionCategory } from '../store/models';
import {
  updateArticle,
  selectArticle,
  fetchCategoriesIfNeeded,
} from '../store/actions';
import {
  getSelectedArticle,
  getCategories,
  getSelectedArticleCategory,
} from '../store/selectors';
import { getAuthedUserId } from '../../auth/store/selectors';
import { PageHeader } from '../../common';

type Props = {
  match: any;
  article: QuestionArticle;
  userId: number;
  categories: QuestionCategory[];
  category: QuestionCategory;
  updateArticle: (
    articleId: number,
    data: Partial<QuestionArticle>,
    categoryId: number
  ) => any;
  selectArticle: (articleId: number) => any;
  fetchCategoriesIfNeeded: () => any;
};

class ArticleEditPage extends Component<Props> {
  componentWillMount() {
    this.props.fetchCategoriesIfNeeded();

    const { match } = this.props;

    if (match.params.id) {
      this.props.selectArticle(+match.params.id);
    }
  }

  handleSubmit = (data: Partial<QuestionArticle>, categoryId: number) => {
    if (!data.id) {
      return;
    }

    this.props.updateArticle(data.id, data, categoryId);
  };

  render() {
    return (
      <div>
        <PageHeader>Edit Article</PageHeader>

        <ArticleForm
          categories={this.props.categories}
          onSubmit={this.handleSubmit}
          article={this.props.article}
          category={this.props.category}
        />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    userId: getAuthedUserId(state),
    article: getSelectedArticle(state),
    categories: getCategories(state),
    category: getSelectedArticleCategory(state),
  }),
  (dispatch: any) =>
    bindActionCreators(
      { updateArticle, selectArticle, fetchCategoriesIfNeeded },
      dispatch
    )
)(ArticleEditPage);
