import * as React from 'react';
import { Select, Button } from 'genui';

import { Box } from '../../ui';
import { Group } from '../../groups/store/models';

export interface UserGroupsProps {
  groups: Group[];
  allGroups: Group[];
  onSubmit: (groupIds: number[]) => any;
}

export interface UserGroupsState {
  selected: SelectItem[];
}

export interface SelectItem {
  label: string;
  value: number;
}

const toSelectItem = (groups: Group[]): SelectItem[] => {
  return groups.map((group: Group) => {
    return {
      label: group.name,
      value: group.id,
    };
  });
};

class UserGroups extends React.Component<UserGroupsProps, UserGroupsState> {
  state: UserGroupsState = {
    selected: [],
  };

  formElem: any;

  componentWillMount() {
    if (this.props.groups) {
      this.setState({
        selected: toSelectItem(this.props.groups),
      });
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.groups) {
      this.setState({
        selected: toSelectItem(nextProps.groups),
      });
    }
  }

  handleChange = (selected: any[]) => {
    this.setState({ selected });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    const ids = this.state.selected.map((item: SelectItem) => item.value);

    this.props.onSubmit && this.props.onSubmit(ids);
  };

  render() {
    const { groups, allGroups } = this.props;
    return (
      <Box title="User Groups">
        <form
          onSubmit={this.handleSubmit}
          ref={(elem: any) => {
            this.formElem = elem;
          }}
        >
          <Select
            name="user-group-select"
            id="user-group-select"
            placeholder="Groups"
            items={toSelectItem(allGroups)}
            defaultSelected={toSelectItem(groups)}
            onChange={this.handleChange}
          />

          <Button type="submit">Save</Button>
        </form>
      </Box>
    );
  }
}

export default UserGroups;
