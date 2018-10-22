import React from 'react';
import styled from '../../../../styled/styled-components';

const FeedTitle: React.SFC<{}> = ({ children }) => {
  return (
    <Container>
      <h3>{children}</h3>
    </Container>
  );
};

export default FeedTitle;

const Container = styled.div`
  padding: 0 10px;
  border-bottom: #e8e8e8 1px solid;
  h3 {
    text-transform: uppercase;
    font-weight: 300;
  }
`;
