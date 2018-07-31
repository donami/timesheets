import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, List } from 'genui';

import { selectGroup, fetchGroupById, removeGroup } from '../store/actions';
import { GroupInfo, GroupMemberList } from '../components';
import {
  getSelectedGroup,
  getSelectedGroupTimesheetTemplate,
} from '../store/selectors';
import { Group } from '../store/models';
import { getSelectedGroupMembers } from '../../common/store/selectors';
import { TimesheetTemplateItem } from '../../timesheets/store/models';
import { Box, Row, Column } from '../../ui';
import { capitalize } from '../../../utils/helpers';
// import { Box } from '../../ui';
// import { User } from '../../users/store/models';

export interface GroupViewPageProps {
  match: any;
  removeGroup: (groupId: number) => any;
  selectGroup: (groupId: number) => any;
  fetchGroupById: (groupId: number) => any;
  template: TimesheetTemplateItem | null;
  group: Group;
  groupMembers: any;
}

class GroupViewPage extends React.Component<GroupViewPageProps> {
  componentWillMount() {
    const { match, selectGroup, fetchGroupById } = this.props;

    if (match && match.params.id) {
      selectGroup(+match.params.id);
      fetchGroupById(+match.params.id);
    }
  }

  handleRemove = () => {
    this.props.removeGroup(this.props.group.id);
  };

  render() {
    const { group, template, groupMembers } = this.props;

    return (
      <div>
        <GroupInfo group={group} />

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
                  {Object.keys(template.hoursDays).map(day => (
                    <List.Item key={day}>
                      {' '}
                      <strong>{capitalize(day)}:</strong>{' '}
                      {template.hoursDays[day]} hour
                      {template.hoursDays[day] > 1 && 's'}
                    </List.Item>
                  ))}
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

        <div>
          <Button onClick={this.handleRemove}>Remove</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  group: getSelectedGroup(state),
  template: getSelectedGroupTimesheetTemplate(state),
  groupMembers: getSelectedGroupMembers(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectGroup,
      fetchGroupById,
      removeGroup,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupViewPage);
