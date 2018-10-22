import React from 'react';
import { Query } from 'react-apollo';

import ChatList from './chat-list';
import styled from '../../../../styled/styled-components';
import { GET_CHATS } from './queries';
import ChatLoader from './chat-loader';

type Props = {
  loggedInUserId: string;
  activeChatId: string;
};

const ChatPageChats: React.SFC<Props> = ({ loggedInUserId, activeChatId }) => {
  return (
    <Container>
      <Query query={GET_CHATS} variables={{ userId: loggedInUserId }}>
        {({ data: { allChats, user }, loading }) => {
          if (loading) {
            return <ChatLoader />;
          }

          const chats = allChats.sort((item: any, other: any) => {
            return (
              new Date(other.lastMessage).getTime() -
              new Date(item.lastMessage).getTime()
            );
          });

          return (
            <ChatList
              chats={chats}
              loggedInUser={user}
              noTitle
              activeChatId={activeChatId}
            />
          );
        }}
      </Query>
    </Container>
  );
};

export default ChatPageChats;

const Container = styled.div`
  height: calc(100% - 40px);
  overflow-y: auto;

  .chat-list-item {
    background: inherit;

    h4 {
      color: #fff;
    }

    &.chat-list-item-unread {
      background: #2b80ff;
      h3 {
        color: #fff !important;
        font-weight: 700;
      }
    }
  }

  .chat-list-empty {
    color: #fff;
    margin: 20px;
  }
`;
