import React from 'react';
import { Icon } from 'genui';

import { Row, Column, Box } from '../../ui';
import { PageHeader } from '../../common';
import {
  fetchCategoriesIfNeeded,
  removeCategory,
  removeArticle,
} from '../store/actions';
import styled from '../../../styled/styled-components';
import { Link } from 'react-router-dom';
import ManageCategoriesList from '../components/manage-categories-list';
import { ManageArticlesList } from '../components';

type Props = {};

const ManageHelpPage: React.SFC<Props> = () => (
  <div>
    <PageHeader>Manage</PageHeader>

    <Row>
      <Column xs={12} sm={12} md={6}>
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
          <ManageCategoriesList />
        </Box>
      </Column>
      <Column xs={12} sm={12} md={6}>
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
          <ManageArticlesList />
        </Box>
      </Column>
    </Row>
  </div>
);

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

export default ManageHelpPage;
