import React from 'react';
import { Input, Button, Icon } from 'genui';

import styled from '../../../../styled/styled-components';
import { compose, withState } from 'recompose';

type Props = {
  sendMessage(options: any): any;
  chatId: string;
  loggedInUserId: string;
  chatUserToId: string;
  // message: string;
};
type StateProps = {
  message: '';
  setMessage(message: string): any;
};

type EnhancedProps = Props & StateProps;

const ChatBottom: React.SFC<EnhancedProps> = ({
  sendMessage,
  loggedInUserId,
  chatId,
  message,
  setMessage,
  chatUserToId,
}) => {
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();

        if (message.length === 0) {
          return;
        }
        sendMessage({
          variables: {
            chatId,
            message,
            chatUserToId,
            ownerId: loggedInUserId,
          },
        });
        setMessage('');
      }}
    >
      <Container>
        <StyledInput
          placeholder="Type your message..."
          value={message}
          onChange={(event: any) => {
            setMessage(event.target.value);
          }}
        />
        <StyledButton
          color="blue"
          type="submit"
          disabled={message.length === 0}
          icon="fas fa-location-arrow"
          circular
        />
      </Container>
    </form>
  );
};

const enhance = compose<EnhancedProps, Props>(
  withState('message', 'setMessage', '')
);

export default enhance(ChatBottom);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input {
    flex: 1;
    margin-right: 20px;
  }
`;

const StyledInput = styled(Input)`
  border: none;
`;

const StyledButton = styled(Button)`
  i,
  svg {
    opacity: 1;
  }
`;