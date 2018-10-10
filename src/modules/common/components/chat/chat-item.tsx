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

  return (
    <Container active={active}>
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

        <Actions>
          <Link to={`/messages/${chat.id}`}>
            <Icon name="fas fa-reply" />
            Reply
          </Link>
          <Link to="/">
            <Icon name="fas fa-eye" />
            Read
          </Link>
        </Actions>
      </RightNode>
    </Container>
  );
};

export default ChatItem;

const Container = withProps<{ active?: boolean }>(styled.div)`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;

  ${props => {
    if (props.active) {
      return css`
        background: #eae6f0;
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

const Actions = styled.div`
  font-size: 0.8em;

  i,
  svg {
    margin-right: 5px;
  }

  a {
    display: inline-block;
    margin-right: 10px;
    color: #6c757d;
    transition: opacity 300ms ease-in-out;

    &:hover {
      opacity: 0.6;
    }
  }
`;
