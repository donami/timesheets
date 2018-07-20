import React from 'react';

import { DEFAULT_USER_IMAGE } from '../../../config/constants';
import withDefaultProps from './with-default-props';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {} & DefaultProps;

type DefaultProps = { circular: boolean; avatar: string };

const defaultProps: DefaultProps = {
  circular: true,
  avatar: DEFAULT_USER_IMAGE,
};

const Avatar: React.SFC<Props> = ({ avatar, circular }) => {
  return (
    <StyledAvatar
      circular={circular}
      src={avatar || DEFAULT_USER_IMAGE}
      alt="User Image"
    />
  );
};

export default withDefaultProps<Props>(defaultProps)(Avatar);

const StyledAvatar = withProps<{ circular: boolean }, HTMLImageElement>(
  styled.img
)`
  ${({ circular }) =>
    circular &&
    css`
      border-radius: 500em;
    `}
`;
