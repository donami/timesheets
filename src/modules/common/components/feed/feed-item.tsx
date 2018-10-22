import React from 'react';

import styled, { withProps } from '../../../../styled/styled-components';

type Props = {
  noPadding?: boolean;
};

const FeedItem: React.SFC<Props> = ({ children, noPadding }) => (
  <Container className="feed-item" noPadding={!!noPadding}>
    {children}
  </Container>
);

const Container = withProps<Props>(styled.div)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  width: ${props => (props.noPadding ? '100%' : 'calc(100% - 20px)')};
  margin: 0;
  background: 0 0;
  border-top: none;

  border-bottom: #eee 1px solid;
  padding: ${props => (props.noPadding ? '0' : '10px')};
  margin-bottom: 0;

  &:last-of-type {
    border-bottom: none;
  }

  a {
    color: ${props => props.theme.primaryColor};
    text-decoration: none;
  }
`;

export default FeedItem;
