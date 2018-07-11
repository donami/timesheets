import * as React from 'react';
import styled from 'styled-components';
import { withProps, css } from '../../../styled/styled-components';
import withDefaultProps from './with-default-props';

type Props = {
  code: string;
  language: string;
  active: boolean;
} & DefaultProps;

type DefaultProps = typeof defaultProps;

const defaultProps = {
  onClick: (language: string) => {},
};

const Flag: React.SFC<Props> = ({ code, language, onClick, active }) => {
  return (
    <Container
      src={`/images/flags/${code}.png`}
      alt={language}
      onClick={() => onClick(code)}
      active={active}
    />
  );
};

const Container = withProps<{ active: boolean }, HTMLImageElement>(styled.img)`
  cursor: pointer;
  width: 24px;
  margin-right: 10px;
  opacity: 0.3;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;

export default withDefaultProps<Props>(defaultProps)(Flag);
