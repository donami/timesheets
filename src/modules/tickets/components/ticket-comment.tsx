import React from 'react';
import { Link } from 'react-router-dom';
import MarkdownIt from 'markdown-it';

import styled from '../../../styled/styled-components';
import { Avatar } from '../../common/components';
import { dateFormat } from 'src/utils/calendar';
import { TicketComment as TicketCommentModel } from '../store/types';

type Props = {
  comment: TicketCommentModel;
};

const TicketComment: React.SFC<Props> = ({ comment }) => {
  const md = new MarkdownIt();

  return (
    <Container>
      <Meta>
        <Avatar view="xs" />
        <Link to={`/user/${comment.owner.id}`}>{`${comment.owner.firstName} ${
          comment.owner.lastName
        }`}</Link>
        <span>replied on</span>{' '}
        <strong>
          {dateFormat(comment.createdAt, 'MMM Do, YYYY')} at{' '}
          {dateFormat(comment.createdAt, 'HH:mm')}
        </strong>
      </Meta>
      <Body dangerouslySetInnerHTML={{ __html: md.render(comment.body) }} />
    </Container>
  );
};

export default TicketComment;

const Container = styled.div`
  margin-bottom: 10px;
  border-bottom: #eee 1px solid;
  padding-bottom: 10px;
`;

const Meta = styled.div`
  margin-bottom: 10px;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    text-decoration: none;
  }

  > span,
  > strong {
    margin-left: 5px;
  }

  .avatar {
    margin-right: 5px;
  }
`;

const Body = styled.div`
  border-radius: 10px;
  padding: 10px;
  background: #f1f1f1;

  p {
    margin: 0;
  }
`;
