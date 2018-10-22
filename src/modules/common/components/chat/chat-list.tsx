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
  match: match<any>;
  location: any;
  activeChatId?: string;
};
type EnhancedProps = Props & {
  history: History;
};

class ChatList extends React.Component<EnhancedProps> {
  render() {
    const { chats, loggedInUser, noTitle, history, activeChatId } = this.props;
    return (
      <Feed className="feed chat-list">
        {!noTitle && <Feed.Title>Messages</Feed.Title>}
        {chats.length === 0 && (
          <Feed.Item>
            <NoActiveChats className="chat-list-empty">
              You have no active chats
            </NoActiveChats>
          </Feed.Item>
        )}
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
  }
}

export default withRouter(ChatList);

const Wrapper = styled.div`
  width: 100%;
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;

const NoActiveChats = styled.div`
  text-align: center;
  width: 100%;
  font-size: 0.9em;
  text-transform: uppercase;
  font-weight: 300;
`;
