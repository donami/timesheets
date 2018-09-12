import * as React from 'react';

import Pagination from './pagination';

type State = {
  items: any;
  pageOfItems: any[];
};

type Props = {
  items: any[];
};

type InjectedProps = {
  items: any;
};

const withPagination = <P extends InjectedProps>(
  Component: React.ComponentType<P>
) => {
  return class WithPagination extends React.Component<Props, State> {
    state = {
      items: [],
      pageOfItems: [],
    };

    componentWillMount() {
      this.setState({ items: this.props.items });
    }

    componentWillReceiveProps(nextProps: Props) {
      this.setState({ items: nextProps.items });
    }

    onChangePage = (pageOfItems: any) => {
      this.setState({ pageOfItems });
    };

    render() {
      return (
        <div>
          <Component {...this.props} items={this.state.pageOfItems} />
          <Pagination
            items={this.state.items}
            onChangePage={this.onChangePage}
          />
        </div>
      );
    }
  };
};

export default withPagination;
