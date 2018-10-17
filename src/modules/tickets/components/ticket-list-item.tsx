import React, { Component } from 'react';
import { Icon, Button } from 'genui';

import styled, { withProps, css } from '../../../styled/styled-components';
import { Ticket } from '../store/types';
import Animation from '../../common/components/animation';
import TicketStatusLabel from './ticket-status-label';
import { Avatar } from '../../common';
import { Link } from 'react-router-dom';

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
      <Container onClick={this.toggleExpand}>
        <Top>
          <Cell style={{ maxWidth: '50px' }}>
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
          <Cell>
            <Avatar view="sm" avatar={ticket.owner.image} />
            <Link to={`/user/${ticket.owner.id}`}>
              {`${ticket.owner.firstName} ${ticket.owner.lastName}`}
            </Link>
          </Cell>
          {/* <Cell>{ticket.project}</Cell> */}
          <Cell>{ticket.type}</Cell>
          <Cell>
            <TicketStatusLabel status={ticket.status} />
          </Cell>
          <Cell>{ticket.priority}</Cell>
          <Cell>
            {ticket.assigned ? (
              <>
                <Avatar view="sm" avatar={ticket.assigned.image} />
                {`${ticket.assigned.firstName} ${ticket.assigned.lastName}`}
              </>
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

export const Container = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Top = styled.div`
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

export const Cell = styled.div`
  padding: 10px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;

  .avatar {
    margin-right: 10px;
  }
`;
