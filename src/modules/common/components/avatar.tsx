import React from 'react';

import {
  DEFAULT_USER_IMAGE,
  DEFAULT_USER_IMAGE_FEMALE,
} from '../../../config/constants';
import withDefaultProps from './with-default-props';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {} & DefaultProps;

type DefaultProps = {
  circular: boolean;
  avatar: any;
  gender: string;
  view: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const defaultProps: DefaultProps = {
  circular: true,
  view: 'md',
  gender: 'male',
  avatar: DEFAULT_USER_IMAGE,
};

const Avatar: React.SFC<Props> = ({ avatar, gender, ...rest }) => {
  let imageUrl = DEFAULT_USER_IMAGE;

  if (avatar && avatar.url) {
    imageUrl = avatar.url;
  } else if (gender) {
    if (gender === 'female') {
      imageUrl = DEFAULT_USER_IMAGE_FEMALE;
    } else if (gender === 'male') {
      imageUrl = DEFAULT_USER_IMAGE;
    }
  }

  if (!imageUrl.startsWith('http')) {
    imageUrl = `/images/${imageUrl}`;
  }

  return (
    <StyledAvatar
      className="avatar"
      gender={gender}
      avatar={imageUrl}
      {...rest}
    />
  );
};

export default withDefaultProps<Props>(defaultProps)(Avatar);

const StyledAvatar = withProps<Props, HTMLDivElement>(styled.div)`
  display: inline-block;
  // border: #e8e8e8 1px solid;

  ${({ avatar }) =>
    avatar &&
    css`
      background-image: url(${avatar});
    `}

  ${({ view }) => {
    if (view === 'xs') {
      return css`
        width: 16px;
        height: 16px;
      `;
    }
    if (view === 'sm') {
      return css`
        width: 32px;
        height: 32px;
      `;
    }
    if (view === 'md') {
      return css`
        width: 48px;
        height: 48px;
      `;
    }
    if (view === 'lg') {
      return css`
        width: 64px;
        height: 64px;
      `;
    }
    if (view === 'xl') {
      return css`
        width: 128px;
        height: 128px;
      `;
    }

    return null;
  }}
  background-position: top center;
  background-size: cover;
  border-radius: 50%;
`;
