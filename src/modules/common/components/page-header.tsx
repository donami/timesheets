import React from 'react';

import styled from '../../../styled/styled-components';

type Props = {
  options?: Function;
};

const PageHeader: React.SFC<Props> = ({ options, children }) => {
  return (
    <Container className="page-header">
      {options && (
        <Options className="page-header-options">{options()}</Options>
      )}
      <Heading>{children}</Heading>
    </Container>
  );
};

export default PageHeader;

const Container = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
  border-bottom: #ccc 1px solid;
  line-height: 60px;
`;

const Options = styled.div`
  float: right;
`;

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: 300;
  text-transform: uppercase;
`;
