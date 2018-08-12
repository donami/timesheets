import React, { Component } from 'react';

import styled from '../../../styled/styled-components';

type TableItem = {
  [key: string]: any;
};

type Props = {
  headings: string[];
  items: TableItem[];
};

class Table extends Component<Props> {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}

const Container: any = styled(Table)``;

export default Table;
