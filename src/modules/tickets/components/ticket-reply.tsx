import React, { Component } from 'react';
import { Input, Button } from 'genui';
import styled from '../../../styled/styled-components';
import { TicketStatus } from '../store/types';
import { Mutation } from 'react-apollo';
import { UPDATE_TICKET_STATUS } from '../store/mutations';

type Props = {
  createComment(options: any): any;
  ticketId: string;
  userId: string;
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
        <h3>Send response</h3>
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
      </Container>
    );
  }
}

export default TicketReply;

const Container = styled.div`
  h3 {
    text-transform: uppercase;
    font-weight: 300;
  }
`;

const ReplyField = styled.div`
  margin-bottom: 10px;

  input,
  textarea {
    width: 100%;
  }
`;
