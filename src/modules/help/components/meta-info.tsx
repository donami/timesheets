import React from 'react';

import styled from '../../../styled/styled-components';
import { Avatar } from '../../common';
import { parseDate } from '../../../utils/helpers';

type Props = {
  avatar: any;
  authorName: string;
  createdAt: string;
};

const MetaInfo: React.SFC<Props> = ({ avatar, authorName, createdAt }) => {
  return (
    <Meta>
      <AvatarContainer>
        <Avatar avatar={avatar} name={authorName} view="md" />
      </AvatarContainer>
      <div>
        Written by {authorName} <br />
        Published on {parseDate(createdAt)}
      </div>
    </Meta>
  );
};

const Meta = styled.div`
  display: flex;
  font-size: 0.8em;
  margin-top: 20px;

  div {
    flex: 1;
  }
`;

const AvatarContainer = styled.div`
  max-width: 48px;
  margin-right: 10px;

  img {
    max-width: 100%;
  }
`;

export default MetaInfo;
