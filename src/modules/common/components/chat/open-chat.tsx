import React from 'react';
import { Button } from 'genui';
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

        proxy.writeQuery({
          query: GET_CHATS,
          variables: {
            userId: loggedInUserId,
          },
          data: {
            ...cache,
            allChats: cache.allChats.concat(data.updateChatUser.chat),
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
