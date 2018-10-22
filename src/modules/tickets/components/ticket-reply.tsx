import React, { Component } from 'react';
import { Input } from 'genui';
import styled from '../../../styled/styled-components';
import { TicketStatus } from '../store/types';
import { Mutation } from 'react-apollo';
import { UPDATE_TICKET_STATUS } from '../store/mutations';
import { Avatar } from '../../common';
import { Button, Intent, TextArea } from '@blueprintjs/core';
import { fullName } from 'src/utils/helpers';

type Props = {
  createComment(options: any): any;
  loading: boolean;
  ticketId: string;
  userId: string;
  avatar?: {
    id: string;
    url: string;
  };
  name: string;
};
type State = Readonly<{
  message: string;
}>;

const initialState: State = {
  message: '',
};

class TicketReply extends Component<Props, State> {
  readonly state = initialState;

  handleSubmit = async (e: any) => {
    e.preventDefault();

    await this.props.createComment({
      variables: {
        body: this.state.message,
        ownerId: this.props.userId,
        ticketId: this.props.ticketId,
      },
    });
    this.setState({ message: '' });
  };

  render() {
    const { loading } = this.props;

    return (
      <Container>
        <Left>
          <Avatar view="md" avatar={this.props.avatar} name={this.props.name} />
        </Left>
        <Right>
          <form onSubmit={this.handleSubmit}>
            <ReplyField>
              <TextArea
                small
                disabled={loading}
                value={this.state.message}
                onChange={(e: any) => {
                  this.setState({ message: e.target.value });
                }}
              />
            </ReplyField>
            <Buttons>
              <Button
                intent={Intent.PRIMARY}
                type="submit"
                loading={loading}
                disabled={!this.state.message.length}
              >
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
                    intent={Intent.NONE}
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
            </Buttons>
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

const Buttons = styled.div`
  > button {
    margin-right: 10px;
  }
`;

const Left = styled.div`
  width: 80px;
`;

const Right = styled.div`
  width: 100%;
`;
