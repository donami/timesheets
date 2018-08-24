import * as React from 'react';
import { Button, Select } from 'genui';

import { Box } from '../../ui';
import { Group } from '../../groups/store/models';
import { Translate } from '../../common';
import styled from '../../../styled/styled-components';

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

  handleChange = (value: number) => {
    this.setState({
      selectedGroupId: value,
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
        <Form
          onSubmit={this.handleSubmit}
          innerRef={(elem: any) => {
            this.formElem = elem;
          }}
        >
          <Select
            options={groups.map(group => ({
              value: group.id,
              label: group.name,
            }))}
            value={this.state.selectedGroupId.toString()}
            onChange={this.handleChange}
          />

          <ButtonContainer>
            <Button type="submit" disabled={this.state.selectedGroupId === 0}>
              <Translate text="common.labels.SAVE" />
            </Button>
          </ButtonContainer>
        </Form>
      </Box>
    );
  }
}

export default UserGroups;

const Form = styled.form`
  display: flex;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`;
