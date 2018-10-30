import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { branch, compose, renderComponent } from 'recompose';
import { Spinner } from '@blueprintjs/core';

import { TimesheetList } from '../components';
import { sortByRecentUpdatedDates } from '../../../utils/helpers';
import { GET_TIMESHEETS } from '../store/queries';
import { CompanyContext } from '../../common/components/routing';

type Props = {
  limit?: number;
};

type DataProps = {};
type EnhancedProps = Props & DataProps;

class TimesheetsRecentlyUpdated extends Component<EnhancedProps> {
  render() {
    const { ...rest } = this.props;

    return (
      <CompanyContext.Consumer>
        {(companyContext: any) => (
          <Query
            query={GET_TIMESHEETS}
            variables={{ companyId: companyContext.company.id }}
          >
            {({ data, loading }) => {
              if (loading) {
                return <Spinner />;
              }

              return (
                <TimesheetList
                  sortFunction={sortByRecentUpdatedDates}
                  items={data.allTimesheets}
                  includeUser
                  {...rest}
                />
              );
            }}
          </Query>
        )}
      </CompanyContext.Consumer>
    );
  }
}

export default TimesheetsRecentlyUpdated;
