import React from 'react';
import { History } from 'history';
import { Mutation } from 'react-apollo';
import { Icon } from 'genui';

import { UPDATE_CHAT_USER } from './chat';
import { GET_CHATS } from './queries';

type Props = {
  chatAuthedUser: any;
  authedUserId: string;
  history: History;
};

const CloseChat: React.SFC<Props> = ({
  chatAuthedUser,
  authedUserId,
  history,
}) => {
  return (
    <Mutation
      mutation={UPDATE_CHAT_USER}
      update={(proxy, { data }) => {
        const cache: any = proxy.readQuery({
          query: GET_CHATS,
          variables: { userId: authedUserId },
        });

        proxy.writeQuery({
          query: GET_CHATS,
          data: {
            ...cache,
            allChats: cache.allChats.filter((chat: any) => {
              // filter out the chat containing the closed chatUser entry
              return !chat.users.find(
                (chatUser: any) => chatUser.id === data.updateChatUser.id
              );
            }),
          },
          variables: {
            userId: authedUserId,
          },
        });
      }}
    >
      {closeChat => (
        <div
          title="Close chat"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            closeChat({
              variables: {
                chatUserId: chatAuthedUser.id,
                open: false,
              },
            });

            history.push('/messages');
          }}
        >
          <Icon name="fas fa-times" />
        </div>
      )}
    </Mutation>
  );
};

export default CloseChat;
