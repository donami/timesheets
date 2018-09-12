import React from 'react';
import styled, { css, withProps } from '../../../../styled/styled-components';
import { Icon } from 'genui';

type Props = {
  items: any[];
  onChangePage: any;
  initialPage?: number;
  pageSize?: number;
};

type State = Readonly<{
  pager: any;
}>;

const initialState: State = {
  pager: {},
};

class Pagination extends React.Component<Props, State> {
  static defaultProps = {
    initialPage: 1,
    pageSize: 10,
  };

  readonly state = initialState;

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage || 1);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage || 1);
    }
  }

  setPage(page: number) {
    const { items, pageSize } = this.props;
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page, pageSize || 10);

    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems: number, currentPage: number, pageSize: number) {
    // default to first page
    // tslint:disable-next-line:no-parameter-reassignment
    currentPage = currentPage || 1;

    // default page size is 10
    // tslint:disable-next-line:no-parameter-reassignment
    pageSize = pageSize || 10;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number;
    let endPage;

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  render() {
    const pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <Container className="pagination">
        <Item
          onClick={() => this.setPage(1)}
          active={pager.currentPage === 1}
          className={pager.currentPage === 1 ? 'disabled' : ''}
        >
          <Icon name="fas fa-angle-double-left  " />
        </Item>
        <Item
          active={false}
          onClick={() => this.setPage(pager.currentPage - 1)}
          className={pager.currentPage === 1 ? 'disabled' : ''}
        >
          <Icon name="fas fa-angle-left" />
        </Item>
        {pager.pages.map((page: number, index: number) => (
          <Item
            active={pager.currentPage === page}
            key={index}
            onClick={() => this.setPage(page)}
          >
            {page}
          </Item>
        ))}
        <Item
          active={false}
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          onClick={() => this.setPage(pager.currentPage + 1)}
        >
          <Icon name="fas fa-angle-right" />
        </Item>

        <Item
          active={pager.currentPage === pager.totalPages}
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          onClick={() => this.setPage(pager.totalPages)}
        >
          <Icon name="fas fa-angle-double-right" />
        </Item>
      </Container>
    );
  }
}

export default Pagination;

const Item = withProps<{ active: boolean }, HTMLAnchorElement>(styled.a)`
  position: relative;
  vertical-align: middle;
  line-height: 1;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: 0 0;
  padding: 0.92em 1.14em;
  text-transform: none;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 400;

  min-width: 3em;
  text-align: center;

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.95);
  }

  ${({ active }) =>
    active &&
    css`
      border-top: none;
      padding-top: 0.92857143em;
      background-color: rgba(0, 0, 0, 0.05);
      color: rgba(0, 0, 0, 0.95);
      -webkit-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
    `}
`;

const Container = styled.div`
  background: #fff;
  font-weight: 300;
  border: 1px solid rgba(34, 36, 38, 0.15);
  -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  min-height: 2.85714286em;
  max-width: 100%;
  overflow: hidden;

  margin: 0;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  vertical-align: middle;

  ${Item} {
    &:first-child {
      border-radius: 0.28571429rem 0 0 0.28571429rem;
    }
  }
`;
