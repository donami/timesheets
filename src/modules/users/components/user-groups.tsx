import * as React from 'react';
import { Button } from 'genui';

import { Box } from '../../ui';
import { Group } from '../../groups/store/models';
import { Translate } from '../../common';

export interface UserGroupsProps {
  groups: Group[];
  initialSelectedGroup: number;
  onSubmit: (groupId: number) => any;
}

export interface UserGroupsState {
  selectedGroupId: number;
}

class UserGroups extends React.Component<UserGroupsProps, UserGroupsState> {
  state: UserGroupsState = {
    selectedGroupId: 0,
  };

  formElem: any;

  componentWillMount() {
    if (this.props.initialSelectedGroup) {
      this.setState({ selectedGroupId: this.props.initialSelectedGroup });
    }
  }

  handleChange = (e: any) => {
    const { value } = e.target;

    this.setState({
      selectedGroupId: +value,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.state.selectedGroupId === 0) {
      return;
    }

    this.props.onSubmit && this.props.onSubmit(this.state.selectedGroupId);
  };

  render() {
    const { groups } = this.props;
    return (
      <Box title={() => <Translate text="users.labels.USER_GROUPS" />}>
        <form
          onSubmit={this.handleSubmit}
          ref={(elem: any) => {
            this.formElem = elem;
          }}
        >
          <select
            name="group"
            onChange={this.handleChange}
            defaultValue={this.state.selectedGroupId.toString()}
          >
            <option value="0">
              <Translate text="groups.labels.CHOOSE_A_GROUP" />
            </option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <Button type="submit">
            <Translate text="common.labels.SAVE" />
          </Button>
        </form>
      </Box>
    );
  }
}

export default UserGroups;
