import React from 'react';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Search, Category } from '../components';
import { QuestionCategory } from '../store/models';
import { fetchCategoriesIfNeeded } from '../store/actions';
import { getCategories } from '../store/selectors';

type Props = {
  fetchCategoriesIfNeeded: () => any;
  categories: QuestionCategory[];
};

const HelpPage: React.SFC<Props> = ({ categories }) => {
  return (
    <div>
      <Search />

      {categories.map(category => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  categories: getCategories(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchCategoriesIfNeeded,
    },
    dispatch
  );

const enhance = compose<any, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<Props, {}>({
    componentWillMount() {
      this.props.fetchCategoriesIfNeeded();
    },
  })
);

export default enhance(HelpPage);
