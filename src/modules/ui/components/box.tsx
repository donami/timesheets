import * as React from 'react';

import styled from '../../../styled/styled-components';

type Props = {
  title: string | Function;
};

class Box extends React.Component<Props> {
  render() {
    const { title, children } = this.props;

    return (
      <StyledBox>
        <BoxTitle>{typeof title === 'function' ? title() : title}</BoxTitle>
        <BoxContent>{children}</BoxContent>
      </StyledBox>
    );
  }
}

const StyledBox = styled.div`
  border: #ccc 1px solid;
  margin-bottom: 20px;
  background: #fff;
`;

const BoxTitle = styled.div`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 300;
  border-bottom: 2px solid #763ffe;
`;

const BoxContent = styled.div`
  padding: 10px;
`;

export default Box;
