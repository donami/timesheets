import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { branch, compose, renderComponent } from 'recompose';
import { Spinner } from '@blueprintjs/core';

import { TimesheetList } from '../components';
import { sortByRecentUpdatedDates } from '../../../utils/helpers';
import { GET_TIMESHEETS } from '../store/queries';

type Props = {
  limit?: number;
};

type DataProps = { timesheets: any };
type EnhancedProps = Props & DataProps;

class TimesheetsRecentlyUpdated extends Component<EnhancedProps> {
  render() {
    const { timesheets, ...rest } = this.props;

    return (
      <TimesheetList
        sortFunction={sortByRecentUpdatedDates}
        items={timesheets}
        includeUser
        {...rest}
      />
    );
  }
}

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TIMESHEETS, {
    props: ({ data }: any) => ({
      timesheets: data.allTimesheets,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderComponent(Spinner))
);

export default enhance(TimesheetsRecentlyUpdated);
