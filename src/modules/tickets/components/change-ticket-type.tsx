import React from 'react';

import styled from 'src/styled/styled-components';
import { Select, ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Button, Intent } from '@blueprintjs/core';
import { Mutation } from 'react-apollo';
import { UPDATE_TICKET } from '../store/mutations';
import { Toaster } from './toaster';

type Props = {
  ticketId: string;
  initialType: string;
};
type State = {
  selected: StatusItem | null;
};
type StatusItem = {
  label: string;
  value: string;
};

const StatusSelect = Select.ofType<StatusItem>();

const items: StatusItem[] = [
  { label: 'Question', value: 'Question' },
  { label: 'Request', value: 'Request' },
];

export const renderItem: ItemRenderer<StatusItem> = (
  type,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={type.label}
      key={type.value}
      onClick={handleClick}
      text={type.label}
    />
  );
};

class ChangeTicketType extends React.Component<Props, State> {
  state: State = {
    selected: null,
  };

  componentWillMount() {
    if (this.props.initialType) {
      const item = items.find(e => e.value === this.props.initialType);

      if (item) {
        this.setState({ selected: item });
      }
    }
  }

  handleItemSelect = async (
    item: StatusItem,
    mutate: (options: any) => any
  ) => {
    await mutate({
      variables: {
        id: this.props.ticketId,
        type: item.value,
      },
    });
    this.setState({ selected: item });
    Toaster.show({
      icon: 'tick',
      message: 'Ticket was updated.',
      intent: Intent.SUCCESS,
    });
  };

  render() {
    const buttonText = this.state.selected
      ? this.state.selected.label
      : 'Select type';

    return (
      <Container>
        <Mutation mutation={UPDATE_TICKET}>
          {mutate => (
            <StatusSelect
              activeItem={this.state.selected}
              filterable={false}
              items={items}
              itemRenderer={renderItem}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={(item: StatusItem) =>
                this.handleItemSelect(item, mutate)
              }
            >
              <Button text={buttonText} rightIcon="double-caret-vertical" />
            </StatusSelect>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default ChangeTicketType;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
