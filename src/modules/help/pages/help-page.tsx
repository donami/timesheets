import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PageHeader } from '../../common';
import { fetchCategoriesIfNeeded } from '../store/actions';
import { getCategories } from '../store/selectors';
import { QuestionCategory } from '../store/models';
import { Category, Search } from '../components';

type Props = {
  fetchCategoriesIfNeeded: () => any;
  categories: QuestionCategory[];
};

class HelpPage extends Component<Props> {
  componentWillMount() {
    this.props.fetchCategoriesIfNeeded();
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <Search />

        {categories.map(category => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpPage);
