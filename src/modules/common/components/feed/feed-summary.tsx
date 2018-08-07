import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {};

const FeedSummary: React.SFC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  margin: 0;
  font-size: 1em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);
`;

export default FeedSummary;
