import React from 'react';
import { Dropdown, Button } from 'genui';
import {
  Popover,
  PopoverInteractionKind,
  Position,
  Intent,
  H5,
  Classes,
  Button as BPButton,
  Tooltip,
  Menu,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core';

import { Ticket, TicketStatus } from '../store/types';
import styled from '../../../styled/styled-components';
import TicketComments from './ticket-comments';
import TicketReply from './ticket-reply';
import { Link, withRouter } from 'react-router-dom';
import TicketComment from './ticket-comment';
import { Mutation, graphql } from 'react-apollo';
import {
  CREATE_TICKET_COMMENT,
  UPDATE_TICKET_STATUS,
  DELETE_TICKET,
} from '../store/mutations';
import { LOGGED_IN_USER } from 'src/modules/auth/pages/auth-page';
import { GET_TICKET } from '../store/queries';
import TicketStatusLabel from './ticket-status-label';
import TicketClosed from './ticket-closed';
import TicketAssign from './ticket-assign';
import { Avatar } from 'src/modules/common';
import { Toaster } from './toaster';
import { compose } from 'recompose';
import { RouterProps } from 'react-router';

type Props = {
  ticket: Ticket;
};

type DataProps = {
  data: any;
};

type EnhancedProps = Props & DataProps & RouterProps;

type DropdownItem = {
  label: string;
  icon: string;
  onClick: any;
};

const TicketView: React.SFC<EnhancedProps> = ({ ticket, data, history }) => {
  if (data.loading) {
    return null;
  }

  const options = [
    {
      label: 'Close ticket',
      icon: 'far fa-times-circle',
      onClick: (item: any) => {
        console.log('clicked', item);
      },
    },
    {
      label: 'Mark as pending',
      icon: 'fas fa-clock',
      onClick: (item: any) => {
        console.log('clicked', item);
      },
    },
  ];

  return (
    <Container>
      <Left>
        <Top>
          <Title>
            <h2>{ticket.title}</h2>
            <TicketStatusLabel status={ticket.status} />
          </Title>

          <TopActions>
            {/* <StyledDropdown
              className="dropdown"
              items={options}
              renderItem={(item: DropdownItem) => {
                return (
                  <div onClick={() => item.onClick(item)}>
                    <i className={item.icon} />
                    {item.label}
                  </div>
                );
              }}
            >
              <Button icon="fas fa-cog" />
            </StyledDropdown> */}

            <Popover
              content={
                <Menu>
                  <Mutation mutation={UPDATE_TICKET_STATUS}>
                    {mutate => (
                      <MenuItem
                        text="Close ticket"
                        icon="cross"
                        onClick={() => {
                          mutate({
                            variables: {
                              id: ticket.id,
                              status: TicketStatus.Closed,
                            },
                          });
                        }}
                      />
                    )}
                  </Mutation>
                  {/* <MenuDivider /> */}
                  <Mutation mutation={UPDATE_TICKET_STATUS}>
                    {mutate => (
                      <MenuItem
                        text="Mark as pending"
                        icon="time"
                        onClick={() => {
                          mutate({
                            variables: {
                              id: ticket.id,
                              status: TicketStatus.Pending,
                            },
                          });
                        }}
                      />
                    )}
                  </Mutation>
                </Menu>
              }
              enforceFocus={false}
              position={Position.BOTTOM_LEFT}
              interactionKind={PopoverInteractionKind.CLICK}
            >
              <BPButton intent={Intent.NONE} icon="cog" />
            </Popover>

            <Mutation mutation={UPDATE_TICKET_STATUS}>
              {mutate => (
                <Tooltip content="Mark as done">
                  <BPButton
                    icon="tick"
                    intent={Intent.SUCCESS}
                    onClick={() => {
                      mutate({
                        variables: {
                          id: ticket.id,
                          status: TicketStatus.Closed,
                        },
                      });
                    }}
                  />
                </Tooltip>
              )}
            </Mutation>

            <Popover
              interactionKind={PopoverInteractionKind.CLICK}
              popoverClassName="bp3-popover-content-sizing"
              position={Position.RIGHT}
              content={
                <div key="text">
                  <H5>Confirm deletion</H5>
                  <p>
                    Are you sure you want to delete this ticket? You won't be
                    able to recover it.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: 15,
                    }}
                  >
                    <BPButton
                      className={Classes.POPOVER_DISMISS}
                      style={{ marginRight: 10 }}
                    >
                      Cancel
                    </BPButton>
                    <Mutation mutation={DELETE_TICKET}>
                      {mutate => (
                        <BPButton
                          intent={Intent.DANGER}
                          className={Classes.POPOVER_DISMISS}
                          onClick={async () => {
                            await mutate({ variables: { id: ticket.id } });
                            Toaster.show({
                              icon: 'tick',
                              message: 'Ticket was removed.',
                              intent: Intent.SUCCESS,
                            });
                            history.goBack();
                          }}
                        >
                          Delete
                        </BPButton>
                      )}
                    </Mutation>
                  </div>
                </div>
              }
            >
              <Tooltip content="Remove ticket" position={Position.RIGHT}>
                <BPButton icon="trash" intent={Intent.DANGER} />
              </Tooltip>
            </Popover>
          </TopActions>
        </Top>

        <TicketComment
          comment={{
            id: ticket.id,
            body: ticket.description,
            createdAt: ticket.createdAt || new Date(),
            owner: ticket.owner,
          }}
        />

        <TicketComments comments={ticket.comments} />

        {ticket.status !== TicketStatus.Closed && (
          <Mutation
            mutation={CREATE_TICKET_COMMENT}
            update={(proxy, { data: { createTicketComment } }) => {
              const { Ticket }: any = proxy.readQuery({
                query: GET_TICKET,
                variables: { id: ticket.id },
              });

              proxy.writeQuery({
                query: GET_TICKET,
                variables: { id: ticket.id },
                data: {
                  Ticket: {
                    ...Ticket,
                    comments: Ticket.comments.concat(createTicketComment),
                  },
                },
              });
            }}
          >
            {mutate => (
              <TicketReply
                ticketId={ticket.id}
                userId={data.user.id}
                avatar={data.user.image}
                createComment={mutate}
              />
            )}
          </Mutation>
        )}
        {ticket.status === TicketStatus.Closed && (
          <TicketClosed ticketId={ticket.id} />
        )}
      </Left>
      <Right>
        <TicketCard>
          <TicketCardTop>
            <span>Ticket</span>
            <div>
              <TicketStatusLabel status={ticket.status} />
            </div>
          </TicketCardTop>
          <TicketCardCenter>
            <Avatar view="lg" avatar={ticket.owner.image} />

            <div>
              <h3>{`${ticket.owner.firstName} ${ticket.owner.lastName}`}</h3>
              <span>{ticket.owner.email}</span>
            </div>
          </TicketCardCenter>
        </TicketCard>
        <TicketDetailsCard>
          <strong>Assignee:</strong>
          <TicketAssign
            ticketId={ticket.id}
            initialSelectedId={ticket.assigned && ticket.assigned.id}
          />
        </TicketDetailsCard>
      </Right>
    </Container>
  );
};

export default compose<EnhancedProps, Props>(
  graphql(LOGGED_IN_USER),
  withRouter
)(TicketView);

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  border-radius: 5px;
  background: #fff;
  flex: 2;
  padding: 20px;
  margin-right: 20px;
`;

const Right = styled.div`
  flex: 1;
  max-width: 20%;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-transform: uppercase;

  h2 {
    font-weight: 300;
    margin: 0;
    margin-right: 10px;
  }
`;

const TopActions = styled.div`
  > span {
    margin: 0 5px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDropdown = styled(Dropdown)`
  line-height: normal;
  align-self: center;

  .g-dropdown-menu {
    left: -102px;
    top: 90%;

    a {
      color: #232c55;
    }

    i {
      margin-right: 0.5em;
    }
  }
`;

const TicketCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  border-radius: 5px;
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
`;

const TicketCardTop = styled.div`
  font-size: 1.5em;
  font-weight: 300;
  text-transform: uppercase;
  border-bottom: #eee 1px solid;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    .ticket-status-label {
      font-size: 0.5em;
    }
  }
`;

const TicketCardCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 10px 0;
    text-align: center;
    flex: 1;
  }

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 0;
  }

  span {
    font-size: 0.8em;
    color: #aaa;
  }
`;

const TicketDetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  border-radius: 5px;
  background: #fff;
  padding: 20px;
`;
