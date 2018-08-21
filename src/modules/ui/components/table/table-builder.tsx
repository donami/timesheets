import React, { Component } from 'react';

import { TimesheetStatus } from '../../../timesheets/store/models';
import TableFilter from './table-filter';
import { parseDate } from '../../../../utils/helpers';
import Table from './table';
import styled from '../../../../styled/styled-components';

export const TableContext = React.createContext({
  handleSort: (property: string) => {},
  sortBy: '',
  sortOrder: '',
});

type ItemOption = {
  label: string;
  icon: string;
  onClick?: any;
  to?: string;
};

type FilterType = any;

type Props = {
  items: any;
  selectable?: boolean;
  itemsOptions?(item?: any): ItemOption[];
  renderItem(item: any): JSX.Element;
  renderHeaders: JSX.Element;
  filters?: FilterType[];
};

type State = Readonly<{
  filter: {
    [key: string]: string | null;
  };
  filteredItems: any[];
  selected: number[];
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
}>;

const initialState: State = {
  filter: {},
  filteredItems: [],
  selected: [],
  sortBy: 'id',
  sortOrder: 'desc',
};

class TableBuilder extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    this.setState({ filteredItems: this.props.items || [] });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ filteredItems: nextProps.items || [] });
  }

  filterItems = () => {
    const { items, filters } = this.props;
    const { filter, sortBy, sortOrder } = this.state;

    if (!filters) {
      return;
    }

    let filteredItems = items;

    filters.forEach(filterItem => {
      if (filterItem.filterAs && this.state.filter[filterItem.property]) {
        filteredItems = filteredItems.filter((item: any) => {
          return filterItem.filterAs(item, this.state.filter);
        });
      }
    });

    if (sortBy) {
      filteredItems = filteredItems.sort((item: any, other: any) => {
        if (item[sortBy] > other[sortBy]) {
          if (sortOrder === 'asc') {
            return -1;
          }
          return 1;
        }
        if (item[sortBy] < other[sortBy]) {
          if (sortOrder === 'asc') {
            return 1;
          }
          return -1;
        }
        return 0;
      });
    }

    this.setState({
      filteredItems,
    });
  };

  handleFilterChange = (value: any, property: any) => {
    this.setState(
      {
        filter: {
          ...this.state.filter,
          [property]: value,
        },
      },
      () => this.filterItems()
    );
  };

  handleSelect = (e: any, itemId: number) => {
    const indexOf = this.state.selected.indexOf(itemId);
    const items = [...this.state.selected];

    if (indexOf > -1) {
      this.setState({
        selected: [...items.slice(0, indexOf), ...items.slice(indexOf + 1)],
      });
    } else {
      this.setState({
        selected: [...this.state.selected, itemId],
      });
    }
  };

  handleSelectAll = () => {
    this.setState({
      selected: this.state.filteredItems.map(item => item.id),
    });
  };

  handleDeselectAll = () => this.setState({ selected: [] });

  handleToggleSelectAll = (e: any) => {
    if (e.target.checked) {
      this.handleSelectAll();
    } else {
      this.handleDeselectAll();
    }
  };

  handleSortBy = (property: string) => {
    const sortOrder = this.state.sortOrder === 'desc' ? 'asc' : 'desc';

    this.setState({ sortOrder, sortBy: property }, () => this.filterItems());
  };

  render() {
    const { filters } = this.props;
    const { filteredItems, selected, sortOrder, sortBy } = this.state;

    return (
      <div>
        <TableContext.Provider
          value={{
            sortBy: sortBy || '',
            sortOrder: sortOrder || '',
            handleSort: this.handleSortBy,
          }}
        >
          {filters && (
            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              {filters.map(filter => (
                <TableFilter
                  key={filter.property}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  options={filter.options}
                  onChange={value =>
                    this.handleFilterChange(value, filter.property)
                  }
                />
              ))}
            </div>
          )}

          {filteredItems.length <= 0 && (
            <NoMatches>No matches found.</NoMatches>
          )}

          {filteredItems.length > 0 && (
            <Table>
              <Table.Header>
                <Table.Row>
                  {this.props.selectable && (
                    <Table.HeaderCell length="5%">
                      <input
                        type="checkbox"
                        onChange={this.handleToggleSelectAll}
                      />
                    </Table.HeaderCell>
                  )}
                  {this.props.renderHeaders}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {filteredItems.map(item => {
                  return (
                    <Table.Row key={item.id}>
                      {this.props.selectable && (
                        <Table.Cell>
                          <input
                            type="checkbox"
                            checked={selected.indexOf(item.id) > -1}
                            onChange={e => this.handleSelect(e, item.id)}
                          />
                        </Table.Cell>
                      )}
                      {this.props.renderItem(item)}
                      {this.props.itemsOptions && (
                        <Table.Cell options={this.props.itemsOptions(item)} />
                      )}
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
        </TableContext.Provider>
      </div>
    );
  }
}

export default TableBuilder;

const NoMatches = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
`;
