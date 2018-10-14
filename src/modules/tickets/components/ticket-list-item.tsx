import React, { Component } from 'react';
import { Icon, Button } from 'genui';

import styled, { withProps, css } from '../../../styled/styled-components';
import { Ticket } from '../store/types';
import Animation from '../../common/components/animation';

type Props = {
  ticket: Ticket;
};

type State = Readonly<{
  expanded: boolean;
}>;

const initialState: State = { expanded: false };

class TicketListItem extends Component<Props, State> {
  readonly state = initialState;

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { ticket } = this.props;
    const { expanded } = this.state;
    return (
      <Container>
        <Top>
          <Cell style={{ maxWidth: 'fit-content' }}>
            {expanded ? (
              <Icon
                style={{ cursor: 'pointer' }}
                name="fas fa-caret-down"
                onClick={this.toggleExpand}
              />
            ) : (
              <Icon
                style={{ cursor: 'pointer' }}
                name="fas fa-caret-right"
                onClick={this.toggleExpand}
              />
            )}
          </Cell>
          <Cell>{ticket.title}</Cell>
          <Cell>{`${ticket.owner.firstName} ${ticket.owner.lastName}`}</Cell>
          {/* <Cell>{ticket.project}</Cell> */}
          <Cell>{ticket.type}</Cell>
          <Cell>{ticket.status}</Cell>
          <Cell>{ticket.priority}</Cell>
          <Cell>
            {ticket.assigned ? (
              `${ticket.assigned.firstName} ${ticket.assigned.lastName}`
            ) : (
              <em>None</em>
            )}
          </Cell>
        </Top>
        <Animation
          isVisible={expanded}
          animationIn="fadeIn"
          animationOut="fadeOut"
        >
          <Bottom expanded={expanded}>
            <div>
              <Button color="blue" to={`/help-desk/ticket/${ticket.id}`}>
                Show details
              </Button>
            </div>
            <div>{ticket.description}</div>
          </Bottom>
        </Animation>
      </Container>
    );
  }
}

export default TicketListItem;

const Container = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
`;

const Bottom = withProps<{ expanded: boolean }>(styled.div)`
  display: flex;
  flex-direction: row;
  border-top: #eee 1px solid;

  ${props => {
    if (!props.expanded) {
      return css`
        display: none;
      `;
    }
    return null;
  }}

  > div {
    flex: 1;
    padding: 10px;
  }
`;

const Cell = styled.div`
  padding: 10px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
