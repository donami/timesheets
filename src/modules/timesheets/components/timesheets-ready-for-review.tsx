import * as React from 'react';
import { Spinner } from '@blueprintjs/core';
import { graphql, Query } from 'react-apollo';
import { compose, branch, renderComponent } from 'recompose';
import gql from 'graphql-tag';

import { TimesheetList } from '../components';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';
import { CompanyContext } from '../../common/components/routing';

type Props = {
  limit?: number;
};

type DataProps = {
  // timesheets: any[];
};
type EnhancedProps = Props & DataProps;

const TimesheetsReadyForReview: React.SFC<EnhancedProps> = ({ ...rest }) => (
  <CompanyContext.Consumer>
    {({ company }: any) => (
      <Query
        query={GET_TIMESHEETS_READY_FOR_REVIEW}
        variables={{ companyId: company.id }}
      >
        {({ data, loading }) => {
          if (loading) {
            return <Spinner />;
          }

          return (
            <div>
              <TimesheetList
                noItemsText="No timesheets are waiting for approval."
                items={data.allTimesheets || []}
                {...rest}
              />
            </div>
          );
        }}
      </Query>
    )}
  </CompanyContext.Consumer>
);

export const GET_TIMESHEETS_READY_FOR_REVIEW = gql`
  query allTimesheets($companyId: ID!) {
    allTimesheets(
      filter: {
        status: "WAITING_FOR_APPROVAL"
        owner: { company: { id: $companyId } }
      }
    ) {
      ...TimesheetListItem
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;

export default TimesheetsReadyForReview;
