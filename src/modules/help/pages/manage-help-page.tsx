import React, { Component } from 'react';
import { List, Icon } from 'genui';

import { QuestionCategory, QuestionArticle } from '../store/models';
import { Row, Column, Box } from '../../ui';
import { PageHeader } from '../../common';
import { connect } from 'react-redux';
import { getCategories, getArticles } from '../store/selectors';
import { bindActionCreators } from 'redux';
import {
  fetchCategoriesIfNeeded,
  removeCategory,
  removeArticle,
} from '../store/actions';
import styled from '../../../styled/styled-components';
import { Link } from 'react-router-dom';

type Props = {
  categories: QuestionCategory[];
  articles: QuestionArticle[];
  fetchCategoriesIfNeeded: () => any;
  removeCategory: (categoryId: number) => any;
  removeArticle: (articleId: number) => any;
};

class ManageHelpPage extends Component<Props> {
  componentWillMount() {
    this.props.fetchCategoriesIfNeeded();
  }

  handleRemoveCategory = (categoryId: number) => {
    this.props.removeCategory(categoryId);
  };

  handleRemoveArticle = (articleId: number) => {
    this.props.removeArticle(articleId);
  };

  render() {
    const { categories, articles } = this.props;
    return (
      <div>
        <PageHeader>Manage</PageHeader>

        <Row>
          <Column sm={6}>
            <Box
              title={() => (
                <>
                  <BoxActions>
                    <Link to="/help/manage/add-category">
                      <Icon name="fas fa-plus-square" title="Add" />
                    </Link>
                  </BoxActions>
                  Categories
                </>
              )}
            >
              <List divided>
                {categories.map(category => (
                  <List.Item key={category.id}>
                    <ListActions>
                      <Link to={`/help/manage/edit-category/${category.id}`}>
                        <Icon name="far fa-edit" title="Edit" />
                      </Link>
                      <Icon
                        name="far fa-trash-alt"
                        title="Remove"
                        onClick={() => this.handleRemoveCategory(category.id)}
                      />
                    </ListActions>
                    {category.title}
                  </List.Item>
                ))}
              </List>
            </Box>
          </Column>
          <Column sm={6}>
            <Box
              title={() => (
                <>
                  <BoxActions>
                    <Link to="/help/manage/add-article">
                      <Icon name="fas fa-plus-square" title="Add" />
                    </Link>
                  </BoxActions>
                  Articles
                </>
              )}
            >
              <List divided>
                {articles.map(article => (
                  <List.Item key={article.id}>
                    <ListActions>
                      <Link to={`/help/manage/edit-article/${article.id}`}>
                        <Icon name="far fa-edit" title="Edit" />
                      </Link>
                      <Icon
                        name="far fa-trash-alt"
                        title="Remove"
                        onClick={() => this.handleRemoveArticle(article.id)}
                      />
                    </ListActions>
                    {article.title}
                  </List.Item>
                ))}
              </List>
            </Box>
          </Column>
        </Row>
      </div>
    );
  }
}

const ListActions = styled.div`
  float: right;

  a {
    color: inherit;
  }

  i {
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const BoxActions = styled.div`
  float: right;

  a {
    text-decoration: none;
    color: #007dcc;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export default connect(
  (state: any) => ({
    categories: getCategories(state),
    articles: getArticles(state),
  }),
  (dispatch: any) =>
    bindActionCreators(
      { fetchCategoriesIfNeeded, removeCategory, removeArticle },
      dispatch
    )
)(ManageHelpPage);