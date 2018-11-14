import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Spinner } from '@blueprintjs/core';

import { TimesheetList } from '../components';
import { sortByRecentUpdatedDates } from '../../../utils/helpers';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';
import { CompanyContext } from '../../common/components/routing';
import { UserRole } from '../../users/store/models';
import gql from 'graphql-tag';

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
            query={GET_TIMESHEETS_RECENTLY_UPDATED}
            variables={{ companyId: companyContext.company.id }}
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
                <TimesheetList
                  sortFunction={sortByRecentUpdatedDates}
                  items={filteredItems || []}
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

const GET_TIMESHEETS_RECENTLY_UPDATED = gql`
  query allTimesheets($companyId: ID) {
    allTimesheets(filter: { owner: { company: { id: $companyId } } }) {
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

export default TimesheetsRecentlyUpdated;
