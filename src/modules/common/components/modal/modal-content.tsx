import React from 'react';

import styled from '../../../../styled/styled-components';

type Props = {};

const ModalContent: React.SFC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

ModalContent.displayName = 'ModalContent';

export default ModalContent;

const Container = styled.div`
  display: block;
  width: 100%;
  font-size: 1em;
  line-height: 1.4;
  padding: 1.5rem;
  background: #fff;
  border-bottom-left-radius: 0.28571429rem;
  border-bottom-right-radius: 0.28571429rem;
  box-sizing: border-box;
`;
