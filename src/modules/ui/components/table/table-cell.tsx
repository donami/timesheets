import React from 'react';
import { Dropdown, Icon } from 'genui';
import { Link } from 'react-router-dom';

import styled, { withProps, css } from '../../../../styled/styled-components';

type DropdownItem = {
  label: string;
  icon: string;
  onClick?: any;
  to?: string;
};

type Props = {
  attention?: boolean;
  textAlign?: 'right' | 'left' | 'center';
  options?: any;
  option?: {
    icon: string;
    onClick?: any;
    to?: string;
  };
};

const TableCell: React.SFC<Props> = ({
  options,
  option,
  children,
  ...rest
}) => {
  if (options) {
    return (
      <Cell {...rest}>
        <StyledDropdown
          className="dropdown"
          items={options}
          renderItem={(item: DropdownItem) => {
            if (item.to) {
              return (
                <Link to={item.to}>
                  <i className={item.icon} />
                  {item.label}
                </Link>
              );
            }

            return (
              <div onClick={item.onClick}>
                <i className={item.icon} />
                {item.label}
              </div>
            );
          }}
        >
          <Icon name="fas fa-ellipsis-h" />
        </StyledDropdown>
      </Cell>
    );
  }

  if (option) {
    return (
      <Cell {...rest}>
        {option.to && (
          <Link to={option.to} className="table-cell-option">
            <Icon name={option.icon} />
          </Link>
        )}

        {option.onClick && (
          <div onClick={option.onClick} className="table-cell-option">
            <Icon name={option.icon} />
          </div>
        )}
      </Cell>
    );
  }

  return <Cell {...rest}>{children}</Cell>;
};

export default TableCell;

const Cell = withProps<Props, HTMLTableDataCellElement>(styled.td)`
  padding: 20px;
  border-bottom: #e9edf0 1px solid;
  background: #fff;

  .table-cell-option {
    cursor: pointer;
    padding: 7.5px 15px;
    border-radius: 20px;

    a {
      color: #232c55;
    }

    &:hover {
      background: #e6f8fc;

      i {
        color: #00b9d2;
      }
    }
  }

  i {
    opacity: 0.5;
  }
  
  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}

  ${({ options }) =>
    options &&
    css`
      text-align: right;
    `}
`;

const StyledDropdown = styled(Dropdown)`
  line-height: normal;
  align-self: center;

  .g-dropdown-menu {
    left: -120px;
    top: 83%;

    a {
      color: #232c55;
    }

    i {
      margin-right: 0.5em;
    }
  }
`;
