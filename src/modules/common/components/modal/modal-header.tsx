import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {};

const ModalHeader: React.SFC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ModalHeader;

const Container = styled.div`
  display: block;
  background: #fff;
  margin: 0;
  padding: 1.25rem 1.5rem;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  border-top-left-radius: 0.28571429rem;
  border-top-right-radius: 0.28571429rem;
  font-size: 1.42857143rem;
  line-height: 1.28571429em;
  font-weight: 700;
`;
