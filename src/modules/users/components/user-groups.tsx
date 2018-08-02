import * as React from 'react';
import { Button } from 'genui';

import { Box } from '../../ui';
import { Group } from '../../groups/store/models';

export interface UserGroupsProps {
  groups: Group[];
  onSubmit: (groupId: number) => any;
}

export interface UserGroupsState {
  selectedGroupId: number | null;
}

class UserGroups extends React.Component<UserGroupsProps, UserGroupsState> {
  state: UserGroupsState = {
    selectedGroupId: null,
  };

  formElem: any;

  handleChange = (e: any) => {
    const { value } = e.target;

    this.setState({
      selectedGroupId: +value,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.state.selectedGroupId === null) {
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
          <select name="group" onChange={this.handleChange}>
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
