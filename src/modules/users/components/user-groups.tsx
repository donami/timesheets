import * as React from 'react';
import { Button } from 'genui';

import { Box } from '../../ui';
import { Group } from '../../groups/store/models';

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
      <Box title="User Groups">
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
            <option value="0">Choose a group...</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <Button type="submit">Save</Button>
        </form>
      </Box>
    );
  }
}

export default UserGroups;
