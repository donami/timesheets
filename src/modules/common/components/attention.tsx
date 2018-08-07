import React from 'react';
import styled from '../../../styled/styled-components';

type Props = {};

const Attention: React.SFC<Props> = () => {
  return <Container />;
};

const Container = styled.div`
  z-index: 100;
  position: absolute;
  top: 21px;
  right: -2px;

  border: #8929fd 2px solid;
  border-radius: 500em;
  width: 3px;
  height: 3px;
`;

export default Attention;
