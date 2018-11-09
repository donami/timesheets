import * as React from 'react';
import { Button, Select } from 'genui';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { Box } from '../../ui';
import { Group } from '../../groups/store/models';
import { Translate, AppToaster } from '../../common';
import styled from '../../../styled/styled-components';
import { UPDATE_USER } from '../store/mutations';
import { Intent } from '@blueprintjs/core';

type Props = {
  groups: Group[];
  user: any;
  initialSelectedGroup: string;
  onSubmit: (groupId: string) => any;
};
type DataProps = {
  addUserToGroup(options: any): any;
  updateUser(options: any): any;
};
type EnhancedProps = DataProps & Props;

type State = {
  selectedGroupId: string;
};

class UserGroups extends React.Component<EnhancedProps, State> {
  state: State = {
    selectedGroupId: '',
  };

  formElem: any;

  componentWillMount() {
    if (this.props.initialSelectedGroup) {
      this.setState({ selectedGroupId: this.props.initialSelectedGroup });
    }
  }

  handleChange = (value: string) => {
    this.setState({
      selectedGroupId: value,
    });
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();

    if (this.state.selectedGroupId === '') {
      return;
    }

    await this.props.updateUser({
      variables: {
        id: this.props.user.id,
        groupId: this.state.selectedGroupId,
      },
    });

    AppToaster.show({
      icon: 'tick',
      message: 'User group was updated.',
      intent: Intent.SUCCESS,
    });
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
            value={this.state.selectedGroupId}
            onChange={this.handleChange}
          />

          <ButtonContainer>
            <Button type="submit" disabled={this.state.selectedGroupId === ''}>
              <Translate text="common.labels.SAVE" />
            </Button>
          </ButtonContainer>
        </Form>
      </Box>
    );
  }
}

const enhance = compose<EnhancedProps, Props>(
  graphql(UPDATE_USER, {
    name: 'updateUser',
  })
);

export default enhance(UserGroups);

const Form = styled.form`
  display: flex;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`;
