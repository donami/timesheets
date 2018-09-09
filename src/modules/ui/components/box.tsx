import * as React from 'react';
import { List } from 'genui';

import styled from '../../../styled/styled-components';

type Props = {
  title: string | Function;
  actions?: any;
};

class Box extends React.Component<Props> {
  render() {
    const { title, children, actions } = this.props;

    return (
      <StyledBox>
        <BoxTitle>
          {actions && <Actions>{actions}</Actions>}
          {typeof title === 'function' ? title() : title}
        </BoxTitle>
        <BoxContent>{children}</BoxContent>
      </StyledBox>
    );
  }
}

const StyledBox = styled.div`
  border: #eee 1px solid;
  margin-bottom: 20px;
  background: #fff;
  font-weight: 300;

  ${List as any} {
    margin: 0;
  }
`;

const BoxTitle = styled.div`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 300;
  border-bottom: 2px solid ${props => props.theme.primaryColor};
`;

const BoxContent = styled.div`
  padding: 10px;
`;

const Actions = styled.div`
  float: right;
  opacity: 0.5;
`;

export default Box;
