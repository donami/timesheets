import React from 'react';
import { Icon } from 'genui';
import { Mutation } from 'react-apollo';
import { CHAT_USER_INFO_MUTATION } from './mutations';

type Props = {
  userId: string;
};

const ChatUserInfoAction: React.SFC<Props> = ({ userId }) => {
  return (
    <Mutation mutation={CHAT_USER_INFO_MUTATION}>
      {mutation => (
        <div
          onClick={() => {
            mutation({
              variables: {
                user: userId,
                open: true,
              },
            });
          }}
          title="Info"
        >
          <Icon name="fas fa-info-circle" />
        </div>
      )}
    </Mutation>
  );
};

export default ChatUserInfoAction;
