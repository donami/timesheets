import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  selectArticle,
  fetchCategoriesIfNeeded,
  giveFeedback,
} from '../store/actions';
import { QuestionArticle, QuestionCategory } from '../store/models';
import {
  getSelectedArticle,
  getSelectedArticleAuthor,
  getSelectedArticleCategory,
} from '../store/selectors';
import {
  ArticleInfo,
  Breadcrumb,
  Search,
  ArticleFeedback,
} from '../components';
import { User } from '../../users/store/models';

type Props = {
  match: any;
  article: QuestionArticle;
  category: QuestionCategory | null | undefined;
  giveFeedback: (articleId: number, response: string) => any;
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

  handleFeedback = (articleId: number, response: string) => {
    this.props.giveFeedback(articleId, response);
  };

  render() {
    const { article, author, category } = this.props;

    if (!article) {
      return null;
    }

    return (
      <div>
        <Search />

        {category && <Breadcrumb category={category} article={article} />}

        <ArticleInfo article={article} author={author} />

        <ArticleFeedback
          articleId={article.id}
          onFeedback={this.handleFeedback}
        />
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
    bindActionCreators(
      { selectArticle, fetchCategoriesIfNeeded, giveFeedback },
      dispatch
    )
)(ArticleViewPage);
