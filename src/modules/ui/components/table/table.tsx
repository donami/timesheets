import React, { Component } from 'react';

import TableHeader from './table-header';
import TableBody from './table-body';
import TableCell from './table-cell';
import TableFooter from './table-footer';
import TableRow from './table-row';
import TableHeaderCell from './table-header-cell';
import styled from '../../../../styled/styled-components';

type Props = {};

class Table extends Component<Props> {
  static Body = TableBody;
  static Cell = TableCell;
  static Footer = TableFooter;
  static Header = TableHeader;
  static HeaderCell = TableHeaderCell;
  static Row = TableRow;

  render() {
    const { children } = this.props;

    return <Container>{children}</Container>;
  }
}

export default Table;

const Container = styled.table`
  margin: 10px 0;

  width: 100%;
  border-collapse: collapse;

  a {
    color: #03b9d1;
    text-decoration: none;
  }
`;
