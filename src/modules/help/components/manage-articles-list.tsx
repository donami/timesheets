import React from 'react';
import { compose, branch, renderComponent, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Icon, Confirm, ActionProps } from 'genui';

import { List } from '../../common';
import styled from '../../../styled/styled-components';
import { GET_ARTICLES } from '../store/queries';
import { DELETE_ARTICLE } from '../store/mutations';

type Props = {
  articles: any[];
  loading: boolean;
  deleteArticle: (options: any) => void;
};

const IsLoading: React.SFC<any> = () => <div>Loading...</div>;

const itemRenderer = (item: any, index: number) => {
  return (
    <Row key={item.id}>
      <RowOptions>
        <Link to={`/help/manage/edit-article/${item.id}`}>
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

const ManageArticlesList: React.SFC<Props> = ({ articles }) => (
  <div>
    <List items={articles} renderItem={itemRenderer} />
  </div>
);

export default compose(
  graphql(GET_ARTICLES, {
    options: { fetchPolicy: 'cache-and-network' },
    props: ({ data }: any) => ({
      articles: data.allArticles || [],
      loading: data.loading,
    }),
  }),
  graphql(DELETE_ARTICLE, {
    name: 'deleteArticle',
    options: {
      update: (proxy, { data: { deleteArticle } }: { data: any }) => {
        const { allArticles }: any = proxy.readQuery({
          query: GET_ARTICLES,
        });

        proxy.writeQuery({
          query: GET_ARTICLES,
          data: {
            allArticles: allArticles.filter(
              (article: any) => article.id !== deleteArticle.id
            ),
          },
        });
      },
    },
  }),
  mapProps((props: any) => {
    return {
      ...props,
      articles: (props.articles || []).map((article: any) => ({
        ...article,
        onDeleteAction: (id: string) => {
          props.deleteArticle({ variables: { id } });
        },
      })),
    };
  }),
  branch((props: any) => props.loading, renderComponent(IsLoading))
)(ManageArticlesList);

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
