import React from 'react';

import styled, { withProps, css } from '../../../../styled/styled-components';
import { Avatar } from '../../components';
import { dateFormat } from '../../../../utils/calendar';

type Props = {
  messages: any[];
  loggedInUserId: string;
};

const ChatPageMessageList: React.SFC<Props> = ({
  messages,
  loggedInUserId,
}) => {
  return (
    <MessageList className="chat-message-list">
      {messages.length === 0 && (
        <EmptyMessages>
          <h3>Hello!</h3>
          <p>
            Start chatting by typing a message in the field below and press the
            button to send.
          </p>
        </EmptyMessages>
      )}
      {messages.map(message => (
        <Message
          className="chat-message"
          me={message.owner.id === loggedInUserId}
          key={message.id}
        >
          {message.owner.id === loggedInUserId ? (
            <>
              <MessageBody className="message-body">
                <MessageText className="message-text">
                  {message.message}
                </MessageText>
                <MessageMeta className="message-meta">
                  {dateFormat(message.createdAt, 'HH:mm')}
                </MessageMeta>
              </MessageBody>
              <MessageAvatar className="message-avatar">
                <Avatar avatar={message.owner.image} />
              </MessageAvatar>
            </>
          ) : (
            <>
              <MessageAvatar className="message-avatar">
                <Avatar avatar={message.owner.image} />
              </MessageAvatar>
              <MessageBody className="message-body">
                <MessageText className="message-text">
                  {message.message}
                </MessageText>
                <MessageMeta className="message-meta">
                  {dateFormat(message.createdAt, 'HH:mm')}
                </MessageMeta>
              </MessageBody>
            </>
          )}
        </Message>
      ))}
    </MessageList>
  );
};

export default ChatPageMessageList;

const MessageList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MessageAvatar = styled.div``;

const MessageBody = styled.div``;

const MessageText = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const MessageMeta = styled.div`
  font-size: 0.8em;
  color: #777;
`;

const Message = withProps<{ me?: boolean }>(styled.div)`
  width: auto;
  max-width: 50%;
  align-self: ${props => (props.me ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;

  display: flex;

  ${MessageBody} {
    align-self: baseline;

    ${({ me }) => {
      if (me) {
        return css`
          margin-right: 10px;
        `;
      }
      return css`
        margin-left: 10px;
      `;
    }}
  }

  ${MessageText} {
    ${({ me }) => {
      if (me) {
        return css`
          background: #87d08d;
          color: #fff;
        `;
      }

      return css`
        background: #f4f4f4;
        color: #b6bdc5;
      `;
    }}
  }

  ${MessageMeta} {
    ${({ me }) => {
      if (me) {
        return css`
          text-align: right;
        `;
      }
      return css`
        text-align: left;
      `;
    }}
  }
`;

const EmptyMessages = styled.div`
  border: #eee 1px solid;
  border-radius: 5px;
  padding: 10px;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 0;
    margin-bottom: 5px;
  }
  p {
    margin: 0;
  }
`;
