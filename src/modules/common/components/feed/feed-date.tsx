import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {};

const FeedDate: React.SFC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: inline-block;
  float: none;
  font-weight: 400;
  font-size: 0.85714286em;
  font-style: normal;
  margin: 0 0 0 0.5em;
  padding: 0;
  color: rgba(0, 0, 0, 0.4);
`;

export default FeedDate;
