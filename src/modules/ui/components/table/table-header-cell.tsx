import React from 'react';
import { Icon } from 'genui';

import styled, { withProps, css } from '../../../../styled/styled-components';
import { TableContext } from './table-builder';

type Props = {
  length?: string;
  // sortBy?: boolean;
  // sortOrder?: 'asc' | 'desc';
  onClick?: any;
  sortableBy?: string;
};

const sortIcon = {
  asc: 'fas fa-chevron-up',
  desc: 'fas fa-chevron-down',
};

const TableHeaderCell: React.SFC<Props> = ({
  sortableBy,
  children,
  ...rest
}) => {
  return (
    <TableContext.Consumer>
      {context => {
        let sortedBy = false;

        if (context.sortBy && context.sortBy === sortableBy) {
          sortedBy = true;
        }

        const injectedProps: any = {
          sortedBy,
        };

        if (sortableBy) {
          injectedProps.onClick = () => context.handleSort(sortableBy);
        }

        if (context.sortBy && context.sortBy.length) {
          injectedProps.sortBy = context.sortBy;
        }

        if (context.sortOrder && context.sortOrder.length) {
          injectedProps.sortOrder = context.sortOrder;
        }

        return (
          <HeaderCell sortBy={sortedBy} {...injectedProps} {...rest}>
            <>{children}</>
            {sortedBy &&
              context.sortOrder && <Icon name={sortIcon[context.sortOrder]} />}
          </HeaderCell>
        );
      }}
    </TableContext.Consumer>
  );
};
export default TableHeaderCell;

const HeaderCell = withProps<
  Props & { sortedBy: boolean },
  HTMLTableHeaderCellElement
>(styled.th)`
  background: #fff;
  padding: 10px 20px;
  color: #8da5af;
  text-transform: uppercase;
  font-weight: 300;
  text-align: left;

  i {
    opacity: 0.5;
    margin-left: 10px;
  }

  ${({ length }) =>
    length &&
    css`
      width: ${length};
    `}

  ${({ sortedBy }) =>
    sortedBy &&
    css`
      color: #03b9d1;
      font-weight: bold;
    `}

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;
