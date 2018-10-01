import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {};

const FeedItem: React.SFC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  width: calc(100% - 20px);
  margin: 0;
  background: 0 0;
  border-top: none;

  border-bottom: #eee 1px solid;
  padding: 10px;
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
