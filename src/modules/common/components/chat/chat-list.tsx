import React from 'react';
import { withRouter, match } from 'react-router';
import { History } from 'history';

import ChatItem from './chat-item';
import Feed from '../feed';
import styled from '../../../../styled/styled-components';

type Props = {
  chats: any[];
  loggedInUser: any;
  noTitle?: boolean;
  history: History;
  match: match<any>;
  location: any;
  activeChatId?: string;
};

const ChatList: React.SFC<Props> = ({
  chats,
  loggedInUser,
  noTitle,
  history,
  activeChatId,
}) => {
  return (
    <Feed className="feed chat-list">
      {!noTitle && <Feed.Title>Messages</Feed.Title>}
      {chats.map((chat: any) => (
        <Feed.Item key={chat.id} noPadding>
          <Wrapper onClick={() => history.push(`/messages/${chat.id}`)}>
            <ChatItem
              chat={chat}
              active={!!(activeChatId && activeChatId === chat.id)}
              loggedInUser={loggedInUser}
            />
          </Wrapper>
        </Feed.Item>
      ))}
    </Feed>
  );
};

export default withRouter(ChatList);

const Wrapper = styled.div`
  width: 100%;
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;
