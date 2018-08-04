import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectArticle, fetchCategoriesIfNeeded } from '../store/actions';
import { QuestionArticle, QuestionCategory } from '../store/models';
import {
  getSelectedArticle,
  getSelectedArticleAuthor,
  getSelectedArticleCategory,
} from '../store/selectors';
import { ArticleInfo, Breadcrumb, Search } from '../components';
import { User } from '../../users/store/models';

type Props = {
  match: any;
  article: QuestionArticle;
  category: QuestionCategory;
  selectArticle: (articleId: number) => any;
  fetchCategoriesIfNeeded: () => any;
  author: User;
};

class ArticleViewPage extends Component<Props> {
  componentWillMount() {
    const { match } = this.props;

    this.props.fetchCategoriesIfNeeded();

    if (match.params.id) {
      this.props.selectArticle(+match.params.id);
    }
  }

  render() {
    const { article, author, category } = this.props;

    if (!article) {
      return null;
    }

    return (
      <div>
        <Search />

        <Breadcrumb category={category} article={article} />

        <ArticleInfo article={article} author={author} />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    article: getSelectedArticle(state),
    author: getSelectedArticleAuthor(state),
    category: getSelectedArticleCategory(state),
  }),
  (dispatch: any) =>
    bindActionCreators({ selectArticle, fetchCategoriesIfNeeded }, dispatch)
)(ArticleViewPage);
