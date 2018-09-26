import React from 'react';
import { compose, branch, renderComponent, mapProps } from 'recompose';
import { graphql, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Icon, Confirm, ActionProps } from 'genui';

import { List } from '../../common';
import styled from '../../../styled/styled-components';
import { DELETE_CATEGORY } from '../store/mutations';
import { GET_CATEGORIES } from '../store/queries';

type Props = {
  deleteCategory: (options: any) => void;
};

const IsLoading: React.SFC<any> = () => <div>Loading...</div>;

const itemRenderer = (item: any, index: number) => {
  return (
    <Row key={item.id}>
      <RowOptions>
        <Link to={`/help/manage/edit-category/${item.id}`}>
          <Icon name="far fa-edit" title="Edit" />
        </Link>
        <Confirm
          trigger={<Icon name="far fa-trash-alt" title="Remove" />}
          onActionClick={(
            e: React.MouseEvent<HTMLElement>,
            actionProps: ActionProps
          ) => {
            if (actionProps.positive) {
              item.onDeleteAction(item.id);
            }
          }}
        />
      </RowOptions>
      {item.title}
    </Row>
  );
};

const ManageCategoriesList: React.SFC<Props> = ({ deleteCategory }) => (
  <div>
    <Query query={GET_CATEGORIES}>
      {({ data, loading }) => {
        if (loading) {
          return null;
        }
        const categories = data.allCategories.map((category: any) => ({
          ...category,
          onDeleteAction: (id: string) => {
            deleteCategory({
              variables: { id },
              optimisticResponse: {
                deleteCategory: {
                  id,
                  __typename: 'Category',
                },
              },
            });
          },
        }));
        return <List items={categories} renderItem={itemRenderer} />;
      }}
    </Query>
  </div>
);

export default compose(
  graphql(DELETE_CATEGORY, {
    name: 'deleteCategory',
    options: {
      update: (proxy, { data: { deleteCategory } }: { data: any }) => {
        const { allCategories }: any = proxy.readQuery({
          query: GET_CATEGORIES,
        });

        proxy.writeQuery({
          query: GET_CATEGORIES,
          data: {
            allCategories: allCategories.filter(
              (category: any) => category.id !== deleteCategory.id
            ),
          },
        });
      },
    },
  }),
  branch((props: any) => props.loading, renderComponent(IsLoading))
)(ManageCategoriesList);

const Row = styled.div`
  padding: 0.2em 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(34, 36, 38, 0.15);
  padding: 0.4em 0;

  &:last-of-type {
    border-bottom-width: 0px;
  }
`;

const RowOptions = styled.div`
  float: right;

  a {
    color: inherit;
    &:hover {
      opacity: 0.5;
    }
  }

  i {
    margin-right: 10px;
    cursor: pointer;
  }
`;
