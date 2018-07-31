import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import { selectGroup, fetchGroupById, removeGroup } from '../store/actions';
import { GroupInfo } from '../components';
import { getSelectedGroup } from '../store/selectors';
import { Group } from '../store/models';
import { getSelectedGroupMembers } from '../../common/store/selectors';
// import { Box } from '../../ui';
// import { User } from '../../users/store/models';

export interface GroupViewPageProps {
  match: any;
  removeGroup: (groupId: number) => any;
  selectGroup: (groupId: number) => any;
  fetchGroupById: (groupId: number) => any;
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
    const { group } = this.props;

    return (
      <div>
        <GroupInfo group={group} />

        {/* <Box title="Users attached to this group">
          <GroupMemberList
            noMembersText="No users are attached to this group"
            members={groupMembers}
          />
        </Box> */}

        <div>
          <Button onClick={this.handleRemove}>Remove</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  group: getSelectedGroup(state),
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
