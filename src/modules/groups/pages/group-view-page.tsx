import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, List } from 'genui';

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

export interface GroupViewPageProps {
  match: any;
  removeGroup: (groupId: number) => any;
  selectGroup: (groupId: number) => any;
  groupId: number;
  template: TimesheetTemplateItem | null;
  group: Group;
  groupMembers: any;
  project: Project;
}

class GroupViewPage extends React.Component<GroupViewPageProps> {
  componentWillMount() {
    const { match, selectGroup, groupId } = this.props;

    if (match && match.params.id && +match.params.id !== groupId) {
      selectGroup(+match.params.id);
    }
  }

  handleRemove = () => {
    this.props.removeGroup(this.props.group.id);
  };

  render() {
    const { group, template, groupMembers, project } = this.props;

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
              <GroupInfo group={group} {...props} />

              {template && (
                <Box title="Timesheet Template">
                  <Row>
                    <Column sm={6}>
                      <List>
                        <List.Item>
                          <strong>Name:</strong> {template.name}
                        </List.Item>
                      </List>
                    </Column>
                    <Column sm={6}>
                      <h3>Hours per day</h3>
                      <List divided>
                        {Object.keys(template.hoursDays).map((day, index) => {
                          const totalHours =
                            (template.hoursDays &&
                              template.hoursDays[day] &&
                              template.hoursDays[day].totalHours) ||
                            0;

                          return (
                            <List.Item key={index}>
                              {' '}
                              <strong>{capitalize(day)}:</strong> {totalHours}{' '}
                              hour
                              {totalHours > 1 && 's'}
                            </List.Item>
                          );
                        })}
                      </List>
                    </Column>
                  </Row>
                </Box>
              )}

              <Box title="Users attached to this group">
                <GroupMemberList
                  noMembersText="No users are attached to this group"
                  members={groupMembers}
                />
              </Box>

              {group && (
                <div>
                  <Button onClick={this.handleRemove}>Remove</Button>
                  <Button to={`/group/${group.id}/edit`}>Edit</Button>
                </div>
              )}
            </div>
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state: any) => ({
  group: getSelectedGroup(state),
  template: getSelectedGroupTimesheetTemplate(state),
  groupMembers: getSelectedGroupMembers(state),
  groupId: getSelectedGroupId(state),
  project: getSelectedGroupProject(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectGroup,
      removeGroup,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupViewPage);
