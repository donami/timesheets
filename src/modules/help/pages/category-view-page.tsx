import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCategory } from '../store/actions';
import { QuestionCategory, QuestionArticle } from '../store/models';
import {
  getSelectedCategory,
  getSelectedCategoryArticles,
} from '../store/selectors';
import { CategoryInfo, Breadcrumb, Search } from '../components';

type Props = {
  match: any;
  category: QuestionCategory;
  articles: QuestionArticle[];
  selectCategory: (categoryId: number) => any;
};

class CategoryViewPage extends Component<Props> {
  componentWillMount() {
    const { match } = this.props;

    if (match.params.id) {
      this.props.selectCategory(+match.params.id);
    }
  }

  render() {
    const { category, articles } = this.props;

    if (!category) {
      return null;
    }

    return (
      <>
        <Search />
        <Breadcrumb category={category} />
        <CategoryInfo category={category} articles={articles} />
      </>
    );
  }
}

export default connect(
  (state: any) => ({
    category: getSelectedCategory(state),
    articles: getSelectedCategoryArticles(state),
  }),
  (dispatch: any) => bindActionCreators({ selectCategory }, dispatch)
)(CategoryViewPage);
