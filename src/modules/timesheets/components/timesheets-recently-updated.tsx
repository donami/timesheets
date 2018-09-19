import React, { Component } from 'react';

import { TimesheetList } from '../components';
import { sortByRecentUpdatedDates } from '../../../utils/helpers';
import { graphql } from 'react-apollo';
import { GET_TIMESHEETS } from '../store/queries';
import { branch, renderNothing, compose } from 'recompose';

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
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(TimesheetsRecentlyUpdated);
