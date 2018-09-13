import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCategory } from '../store/actions';
import { QuestionCategory, QuestionArticle } from '../store/models';
import {
  getSelectedCategory,
  getSelectedCategoryArticles,
} from '../store/selectors';
import { CategoryInfo, Breadcrumb, Search } from '../components';
import { compose, lifecycle, branch, renderNothing } from 'recompose';

type Props = {
  match: any;
  category: QuestionCategory;
  articles: QuestionArticle[];
  selectCategory: (categoryId: number) => any;
};

const CategoryViewPage: React.SFC<Props> = ({ category, articles }) => (
  <>
    <Search />
    <Breadcrumb category={category} />
    <CategoryInfo category={category} articles={articles} />
  </>
);

const enhance = compose(
  connect(
    (state: any) => ({
      category: getSelectedCategory(state),
      articles: getSelectedCategoryArticles(state),
    }),
    (dispatch: any) => bindActionCreators({ selectCategory }, dispatch)
  ),
  lifecycle<Props, {}>({
    componentWillMount() {
      const { match } = this.props;

      if (match.params.id) {
        this.props.selectCategory(+match.params.id);
      }
    },
  }),
  branch<Props>(props => !props.category, renderNothing)
);

export default enhance(CategoryViewPage);
