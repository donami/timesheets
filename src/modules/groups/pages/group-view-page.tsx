import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, List, Confirm, ActionProps } from 'genui';

import { selectGroup, removeGroup } from '../store/actions';
import { GroupInfo, GroupMemberList } from '../components';
import {
  getSelectedGroup,
  getSelectedGroupTimesheetTemplate,
  getSelectedGroupId,
} from '../store/selectors';
import { Group } from '../store/models';
import {
  getSelectedGroupMembers,
  getSelectedGroupProject,
} from '../../common/store/selectors';
import { TimesheetTemplateItem } from '../../timesheets/store/models';
import { Box, Row, Column } from '../../ui';
import { capitalize } from '../../../utils/helpers';
import { Switch, Route } from 'react-router-dom';
import { GroupEditPage } from '../pages';
import { Project } from '../../projects/store/models';
import { PageHeader } from '../../common';
import { compose, withHandlers, branch, renderNothing } from 'recompose';
import { GET_GROUP, GET_GROUPS } from '../store/queries';
import { graphql } from 'react-apollo';
import { DELETE_GROUP } from '../store/mutations';

type Props = {
  match: any;
  removeGroup: (groupId: number) => any;
  selectGroup: (groupId: number) => any;
  groupId: number;
  template: TimesheetTemplateItem | null;
  group: Group;
  groupMembers: any;
  project: Project;
};
type DataProps = {
  loading: boolean;
  group: any;
  deleteGroup(options: any): any;
};
type HandlerProps = {
  onRemove(): void;
};
type EnhancedProps = Props & DataProps & HandlerProps;

const dayMap = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday',
};

class GroupViewPage extends React.Component<EnhancedProps> {
  // componentWillMount() {
  //   const { match, selectGroup, groupId } = this.props;

  //   if (match && match.params.id && +match.params.id !== groupId) {
  //     selectGroup(+match.params.id);
  //   }
  // }

  // handleRemove = () => {
  //   this.props.removeGroup(this.props.group.id);
  // };

  render() {
    const { group, template, project, onRemove } = this.props;

    return (
      <Switch>
        <Route
          path={`/group/:id/edit`}
          render={props => <GroupEditPage group={group} project={project} />}
        />

        <Route
          path={`/group/:id`}
          render={props => (
            <div>
              <PageHeader
                options={() => (
                  <>
                    {group && (
                      <div>
                        <Confirm
                          trigger={<Button color="red">Remove</Button>}
                          onActionClick={(
                            e: React.MouseEvent<HTMLElement>,
                            actionProps: ActionProps
                          ) => {
                            if (actionProps.positive) {
                              onRemove();
                            }
                          }}
                        />

                        <Button to={`/group/${group.id}/edit`}>Edit</Button>
                      </div>
                    )}
                  </>
                )}
              >
                View Group
              </PageHeader>
              <GroupInfo group={group} {...props} />

              {group.template && (
                <Box title="Timesheet Template">
                  <Row>
                    <Column sm={6}>
                      <List>
                        <List.Item>
                          <strong>Name:</strong> {group.template.name}
                        </List.Item>
                      </List>
                    </Column>
                    <Column sm={6}>
                      <h3>Hours per day</h3>
                      <List divided>
                        {Object.keys(group.template.hoursDays).map(
                          (day, index) => {
                            const totalHours =
                              (group.template.hoursDays &&
                                group.template.hoursDays[day] &&
                                group.template.hoursDays[day].totalHours) ||
                              0;

                            return (
                              <List.Item key={index}>
                                {' '}
                                <strong>{dayMap[index]}:</strong> {totalHours}{' '}
                                hour
                                {totalHours > 1 && 's'}
                              </List.Item>
                            );
                          }
                        )}
                      </List>
                    </Column>
                  </Row>
                </Box>
              )}

              <Box title="Users attached to this group">
                <GroupMemberList
                  noMembersText="No users are attached to this group"
                  members={group.users || []}
                />
              </Box>
            </div>
          )}
        />
      </Switch>
    );
  }
}

const enhance = compose(
  graphql(GET_GROUP, {
    options: (props: any) => ({
      variables: { id: props.match.params.id },
    }),
    props: ({ data }: any) => ({
      group: data.Group,
      loading: data.loading,
    }),
  }),
  graphql(DELETE_GROUP, {
    name: 'deleteGroup',
    options: {
      update: (proxy, { data: { deleteGroup } }: { data: any }) => {
        const { allGroups }: any = proxy.readQuery({
          query: GET_GROUPS,
        });

        proxy.writeQuery({
          query: GET_GROUPS,
          data: {
            allGroups: allGroups.filter(
              (group: any) => group.id !== deleteGroup.id
            ),
          },
        });
      },
    },
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onRemove: ({ deleteGroup, group }) => () => {
      deleteGroup({ variables: { id: group.id } });
    },
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(GroupViewPage);
