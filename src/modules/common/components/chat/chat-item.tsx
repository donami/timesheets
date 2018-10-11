import React from 'react';

import styled, { css, withProps } from '../../../../styled/styled-components';
import { Avatar } from '../../components';
import { Link } from 'react-router-dom';
import { Icon } from 'genui';
import { dateFormat } from '../../../../utils/calendar';

type Props = { chat: any; loggedInUser: any; active?: boolean };

const ChatItem: React.SFC<Props> = ({ chat, loggedInUser, active }) => {
  const lastMessage = chat.messages.length
    ? chat.messages[chat.messages.length - 1]
    : undefined;

  const otherUser = chat.users.filter(
    (chatUser: any) => chatUser.user.id !== loggedInUser.id
  )[0];

  const chatUserMe = chat.users.find(
    (chatUser: any) => chatUser.user.id === loggedInUser.id
  );
  const unread = !!(chatUserMe && chatUserMe.unread);

  const classes = ['chat-list-item'];
  if (unread) {
    classes.push('chat-list-item-unread');
  }

  return (
    <Container active={active} unread={unread} className={classes.join(' ')}>
      <LeftNode>
        <Avatar />
      </LeftNode>
      <RightNode>
        <Top>
          <h4>{`${otherUser.user.firstName} ${otherUser.user.lastName}`}</h4>

          {lastMessage && (
            <span>{dateFormat(lastMessage.createdAt, 'HH:mm')}</span>
          )}
        </Top>

        {lastMessage && <p>{lastMessage.message}</p>}
        {!lastMessage && (
          <p>
            <em>No messages yet...</em>
          </p>
        )}
      </RightNode>
    </Container>
  );
};

export default ChatItem;

const Container = withProps<{ active?: boolean; unread: boolean }>(styled.div)`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;

  ${({ unread }) =>
    unread &&
    css`
      background: #e2f0ff;

      h3 {
        color: #777 !important;
      }
    `}

  ${props => {
    if (props.active) {
      return css`
        background: #222 !important;
      `;
    }
    return null;
  }}
`;

const LeftNode = styled.div`
  flex: 1;
  max-width: 60px;
  min-width: 60px;
`;

const RightNode = styled.div`
  flex: 1;

  p {
    margin: 0;
    font-size: 0.9em;
    color: #adb5bd;
    margin-bottom: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  h4 {
    font-size: 1em;
    font-weight: 300;
    margin: 0;
    padding: 0;

    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  span {
    font-size: 0.9em;
    color: #adb5bd;
  }
`;
