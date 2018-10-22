import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon } from 'genui';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { Row, Column, Box } from '../../ui';
import {
  TimesheetsReadyForReview,
  TimesheetsPastDueDate,
  TimesheetsRecentlyUpdated,
} from '../../timesheets';
import { Translate, PageHeader } from '../../common';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import {
  Button as BPButton,
  Intent,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position,
} from '@blueprintjs/core';
import { RouterProps } from 'react-router';

type Props = {};
type DataProps = {
  user: any;
};
type EnhancedProps = Props & DataProps & RouterProps;

class DashboardManagerPage extends React.Component<EnhancedProps> {
  render() {
    const { user, history } = this.props;

    return (
      <div>
        <PageHeader
          options={
            <Popover position={Position.BOTTOM}>
              <BPButton
                text="Quick Actions"
                intent={Intent.PRIMARY}
                rightIcon="caret-down"
              />

              <Menu>
                <MenuItem
                  text="Manage help pages"
                  icon="document"
                  onClick={() => history.push('/help/manage')}
                />
                <MenuItem
                  text="New project"
                  icon="projects"
                  onClick={() => history.push('/projects/add')}
                />
                <MenuItem
                  text="New user"
                  icon="user"
                  onClick={() => history.push('/users/add')}
                />
              </Menu>
            </Popover>
          }
        >
          Welcome {user.firstName}!
        </PageHeader>

        <Row>
          <Column xs={12} sm={6}>
            <Box
              actions={
                <Link to="/manage-timesheets">
                  <Icon name="fas fa-external-link-alt" />
                </Link>
              }
              title={() => (
                <Translate text="timesheet.labels.TIMESHEETS_READY_FOR_REVIEW" />
              )}
            >
              <TimesheetsReadyForReview limit={10} />
            </Box>
          </Column>
          <Column xs={12} sm={6}>
            <Box
              actions={
                <Link to="/manage-timesheets">
                  <Icon name="fas fa-external-link-alt" />
                </Link>
              }
              title={() => (
                <>
                  <Translate text="timesheet.labels.TIMESHEETS_PAST_DUE_DATE" />
                </>
              )}
            >
              <TimesheetsPastDueDate limit={10} />
            </Box>
          </Column>
        </Row>

        <Row>
          <Column xs={12} sm={12}>
            <Box
              actions={
                <Link to="/manage-timesheets">
                  <Icon name="fas fa-external-link-alt" />
                </Link>
              }
              title="Timesheets Recently Updated"
            >
              <TimesheetsRecentlyUpdated limit={10} />
            </Box>
          </Column>
        </Row>
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.user || null,
    }),
  })
);

export default enhance(DashboardManagerPage);
