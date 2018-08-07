import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {};

const FeedContent: React.SFC<any> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  text-align: left;
  word-wrap: break-word;
  margin: 0.5em 0 0.35714286em 1.14285714em;
`;

export default FeedContent;
