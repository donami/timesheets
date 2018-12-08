import * as React from 'react';
import styled from 'styled-components';

export interface FooterProps {
  containerHeight: number;
}

class Footer extends React.Component<FooterProps> {
  render() {
    return (
      <Container {...this.props}>
        All Rights Reserved, Copyright © Dashtime 2018
      </Container>
    );
  }
}

const Container = styled.div`
  text-align: center;
  ${(props: FooterProps) => `line-height: ${props.containerHeight}px;`};
`;

export default Footer;
