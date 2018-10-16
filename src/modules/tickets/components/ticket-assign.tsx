import React, { Component } from 'react';
import { MenuItem, Button } from '@blueprintjs/core';
import { ItemRenderer, ItemPredicate, Select } from '@blueprintjs/select';
import { Mutation, Query } from 'react-apollo';
import { UPDATE_TICKET } from '../store/mutations';
import { GET_USERS } from 'src/modules/users/store/queries';
import styled from 'src/styled/styled-components';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

const UserSelect = Select.ofType<IUser>();

export const filterUser: ItemPredicate<IUser> = (query, user) => {
  return (
    `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.indexOf(
      query.toLowerCase()
    ) >= 0
  );
};

export const renderUser: ItemRenderer<IUser> = (
  user,
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${user.firstName} ${user.lastName}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={user.id}
      onClick={handleClick}
      text={text}
    />
  );
};

type Props = {
  ticketId: string;
  initialSelectedId?: string;
};
type State = {
  selected: IUser | null;
};

class TicketAssign extends Component<Props, State> {
  state: State = {
    selected: null,
  };

  private handleValueChange = (user: IUser) =>
    this.setState({ selected: user });

  render() {
    const { selected } = this.state;

    return (
      <Query query={GET_USERS}>
        {({ loading, data }) => {
          if (loading) {
            return null;
          }

          const initialSelected = this.props.initialSelectedId
            ? data.allUsers.find(
                (user: IUser) => user.id === this.props.initialSelectedId
              )
            : null;

          const text = selected
            ? `${selected.firstName} ${selected.lastName}`
            : initialSelected
              ? `${initialSelected.firstName} ${initialSelected.lastName}`
              : 'Select user...';

          return (
            <Container>
              <UserSelect
                items={data.allUsers}
                itemPredicate={filterUser}
                itemRenderer={renderUser}
                noResults={<MenuItem disabled={true} text="No results." />}
                onItemSelect={this.handleValueChange}
              >
                <Button text={text} rightIcon="double-caret-vertical" />
              </UserSelect>
              <Mutation mutation={UPDATE_TICKET}>
                {mutate => (
                  <Button
                    text="Assign"
                    onClick={() => {
                      if (!this.state.selected) {
                        return;
                      }
                      mutate({
                        variables: {
                          id: this.props.ticketId,
                          assignedId: this.state.selected.id,
                        },
                      });
                    }}
                  />
                )}
              </Mutation>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default TicketAssign;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
