import React from 'react';

import { DEFAULT_USER_IMAGE } from '../../../config/constants';
import withDefaultProps from './with-default-props';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {} & DefaultProps;

type DefaultProps = {
  circular: boolean;
  avatar: string;
  view: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const defaultProps: DefaultProps = {
  circular: true,
  view: 'md',
  avatar: DEFAULT_USER_IMAGE,
};

const Avatar: React.SFC<Props> = ({ avatar, ...rest }) => {
  return <StyledAvatar avatar={avatar || DEFAULT_USER_IMAGE} {...rest} />;
};

export default withDefaultProps<Props>(defaultProps)(Avatar);

const StyledAvatar = withProps<Props, HTMLDivElement>(styled.div)`
  display: inline-block;

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
