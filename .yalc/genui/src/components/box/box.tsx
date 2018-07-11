import * as React from 'react';
import styled from 'styled-components';

export interface BoxProps {
  title: string;
}

class Box extends React.Component<BoxProps> {
  render() {
    const { title, children } = this.props;
    return (
      <StyledBox>
        <BoxTitle>{title}</BoxTitle>
        <BoxContent>{children}</BoxContent>
      </StyledBox>
    );
  }
}

const StyledBox = styled.div`
  font-family: 'Roboto', sans-serif;
  border: #ccc 1px solid;
  margin-bottom: 20px;
`;

const BoxTitle = styled.div`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 300;
  border-bottom: 2px solid #007dcc;
`;

const BoxContent = styled.div`
  padding: 10px;
`;

export default Box;
