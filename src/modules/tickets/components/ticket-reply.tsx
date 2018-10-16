import React, { Component } from 'react';
import { Input, Button } from 'genui';
import styled from '../../../styled/styled-components';
import { TicketStatus } from '../store/types';
import { Mutation } from 'react-apollo';
import { UPDATE_TICKET_STATUS } from '../store/mutations';
import { Avatar } from 'src/modules/common';

type Props = {
  createComment(options: any): any;
  ticketId: string;
  userId: string;
  avatar?: {
    id: string;
    url: string;
  };
};
type State = Readonly<{
  message: string;
}>;

const initialState: State = {
  message: '',
};

class TicketReply extends Component<Props, State> {
  readonly state = initialState;

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.createComment({
      variables: {
        body: this.state.message,
        ownerId: this.props.userId,
        ticketId: this.props.ticketId,
      },
    });
    this.setState({ message: '' });
  };

  render() {
    return (
      <Container>
        <Left>
          <Avatar avatar={this.props.avatar} />
        </Left>
        <Right>
          <form onSubmit={this.handleSubmit}>
            <ReplyField>
              <Input
                multiline
                value={this.state.message}
                onChange={(e: any) => {
                  this.setState({ message: e.target.value });
                }}
              />
            </ReplyField>
            <Button color="blue" type="submit">
              Reply
            </Button>
            <Mutation
              mutation={UPDATE_TICKET_STATUS}
              optimisticResponse={{
                updateTicket: {
                  id: this.props.ticketId,
                  status: TicketStatus.Closed,
                  updatedAt: new Date(),
                  __typename: 'Ticket',
                },
              }}
            >
              {mutate => (
                <Button
                  type="button"
                  onClick={() => {
                    mutate({
                      variables: {
                        id: this.props.ticketId,
                        status: TicketStatus.Closed,
                      },
                    });
                  }}
                >
                  Close ticket
                </Button>
              )}
            </Mutation>
          </form>
        </Right>
      </Container>
    );
  }
}

export default TicketReply;

const Container = styled.div`
  display: flex;
`;

const ReplyField = styled.div`
  margin-bottom: 10px;

  input,
  textarea {
    width: 100%;
  }
`;

const Left = styled.div`
  width: 80px;
`;

const Right = styled.div`
  width: 100%;
`;
