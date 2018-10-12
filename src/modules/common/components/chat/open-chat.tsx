import React from 'react';
import { History } from 'history';
import { Mutation } from 'react-apollo';

import { UPDATE_CHAT_USER } from './chat';
import { GET_CHATS } from './queries';

type Props = {
  history: History;
  chat: any;
  loggedInUserId: string;
};

const OpenChat: React.SFC<Props> = ({
  history,
  chat,
  loggedInUserId,
  children,
}) => {
  return (
    <Mutation
      mutation={UPDATE_CHAT_USER}
      update={(proxy, { data }) => {
        const cache: any = proxy.readQuery({
          query: GET_CHATS,
          variables: { userId: loggedInUserId },
        });

        const existingChat = cache.allChats.find(
          (chat: any) => chat.id === data.updateChatUser.chat.id
        );

        let updatedChats = [];
        if (existingChat) {
          const index = cache.allChats.indexOf(existingChat);

          updatedChats = [
            ...cache.allChats.slice(0, index),
            data.updateChatUser.chat,
            ...cache.allChats.slice(index + 1),
          ];
        } else {
          updatedChats = [data.updateChatUser.chat, ...cache.allChats];
        }

        proxy.writeQuery({
          query: GET_CHATS,
          variables: {
            userId: loggedInUserId,
          },
          data: {
            ...cache,
            allChats: updatedChats,
          },
        });
      }}
    >
      {openChat => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={async () => {
            const updates = chat.users
              .filter((chatUser: any) => {
                return chatUser.user.id === loggedInUserId;
              })
              .map((chatUser: any) => {
                return openChat({
                  variables: {
                    chatUserId: chatUser.id,
                    open: true,
                  },
                });
              });

            await Promise.all(updates);

            history.push(`/messages/${chat.id}`);
          }}
        >
          {children}
        </div>
      )}
    </Mutation>
  );
};

export default OpenChat;
