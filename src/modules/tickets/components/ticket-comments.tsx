import React from 'react';
import TicketComment from './ticket-comment';
import { TicketComment as TicketCommentModel } from '../store/types';

type Props = {
  comments: TicketCommentModel[];
};

const TicketComments: React.SFC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map(comment => (
        <TicketComment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default TicketComments;
