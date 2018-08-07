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
  width: 100%;
  padding: 0.21428571rem 0;
  margin: 0;
  background: 0 0;
  border-top: none;
`;

export default FeedItem;
