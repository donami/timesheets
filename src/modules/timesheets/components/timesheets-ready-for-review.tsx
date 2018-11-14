import * as React from 'react';
import { Spinner } from '@blueprintjs/core';
import { graphql, Query } from 'react-apollo';
import { compose, branch, renderComponent } from 'recompose';
import gql from 'graphql-tag';

import { TimesheetList } from '../components';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';
import { CompanyContext } from '../../common/components/routing';
import { UserRole } from '../../users/store/models';

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

          let filteredItems = data.allTimesheets;

          if (
            data.user.role === UserRole.Manager ||
            data.user.role === UserRole.User
          ) {
            filteredItems = data.allTimesheets.filter((timesheet: any) => {
              return !!data.user.projectMember.find(
                (userProject: any) =>
                  userProject.project.id === timesheet.project.id
              );
            });
          }

          return (
            <div>
              <TimesheetList
                noItemsText="No timesheets are waiting for approval."
                items={filteredItems || []}
                {...rest}
              />
            </div>
          );
        }}
      </Query>
    )}
  </CompanyContext.Consumer>
);

const GET_TIMESHEETS_READY_FOR_REVIEW = gql`
  query allTimesheets($companyId: ID!) {
    allTimesheets(
      filter: {
        status: "WAITING_FOR_APPROVAL"
        owner: { company: { id: $companyId } }
      }
    ) {
      ...TimesheetListItem
      project {
        id
      }
    }
    user {
      id
      role
      projectMember {
        id
        project {
          id
          name
        }
      }
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;

export default TimesheetsReadyForReview;
