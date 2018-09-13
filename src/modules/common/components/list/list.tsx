import React from 'react';
import {
  compose,
  defaultProps,
  branch,
  renderComponent,
  mapProps,
} from 'recompose';

import { withPagination } from '../pagination';

export type ListProps = Props;

type Props = {
  items: any[];
  limit?: number;
  renderItem(item: any, index: number): JSX.Element;
  filter?(item: any): boolean;
  sortFunction?(item: any, other: any): number;
  paginated?: boolean;
  pageSize?: number;
  className?: string;
  noItemsText?: string;
  header?: JSX.Element;
};

const NoItems: React.SFC<Props> = ({ noItemsText }) => (
  <div>{noItemsText || 'No items'}</div>
);

const List: React.SFC<Props> = ({ items, renderItem, className, header }) => {
  if (!renderItem) {
    return null;
  }

  return (
    <>
      {header && header}
      <div className={className}>{items.map(renderItem)}</div>
    </>
  );
};

export default compose<Props, Props>(
  defaultProps({
    paginated: false,
  }),
  mapProps((props: Props) => {
    if (!props.filter && !props.sortFunction && !props.limit) {
      return props;
    }

    let updatedItems = [...props.items];

    if (props.filter) {
      updatedItems = updatedItems.filter(props.filter);
    }
    if (props.sortFunction) {
      updatedItems = updatedItems.sort(props.sortFunction);
    }
    if (props.limit) {
      updatedItems = updatedItems.slice(0, props.limit);
    }

    return {
      ...props,
      items: updatedItems,
    };
  }),
  branch(
    ({ items, renderItem }) => items.length === 0 || !renderItem,
    renderComponent(NoItems)
  ),
  branch(({ paginated }) => paginated, withPagination)
)(List);
