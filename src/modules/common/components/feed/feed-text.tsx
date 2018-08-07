import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {};

const FeedText: React.SFC<Props> = ({ children }) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.div`
  margin: 0.5em 0 0;
  background: 0 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.87);
  border-left: none;
  font-size: 1em;
  max-width: 500px;
  line-height: 1.4285em;
`;

export default FeedText;
