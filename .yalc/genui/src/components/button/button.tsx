import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const sizes = {
  mini: '0.78571429rem',
  tiny: '0.85714286rem',
  small: '0.92857143rem',
  medium: '1rem',
  large: '1.14285714rem',
  big: '1.28571429rem',
  huge: '1.42857143rem',
  massive: '1.71428571rem',
};

const size = ({ size }: ButtonProps) => {
  if (size) {
    return css`
      font-size: ${sizes[size]};
    `;
  }
  return null;
};

const useIcon = ({ useIcon }: ButtonProps) => {
  if (useIcon) {
    return `
      padding: 0.78571429em 0.78571429em 0.78571429em;

      i,
      svg {
        height: 0.85714286em;
        -webkit-transition: opacity 0.1s ease;
        transition: opacity 0.1s ease;
        opacity: 0.9;
        margin: 0 !important;
        vertical-align: top;
      }
    `;
  }
  return null;
};

const circular = ({ circular }: ButtonProps) => {
  if (circular) {
    return `
      border-radius: 10em;

      i,
      svg {
        width: 1em;
        vertical-align: baseline;
      }
    `;
  }
  return null;
};

const color = ({ color }: ButtonProps) => {
  switch (color) {
    case 'blue':
      return css`
        background-color: #2185d0;
        color: #fff;
        text-shadow: none;
        background-image: none;
      `;

    case 'red':
      return css`
        background-color: #db2828;
        color: #fff;
        text-shadow: none;
        background-image: none;
      `;

    case 'teal':
      return css`
        background-color: #00b5ad;
        color: #fff;
        text-shadow: none;
        background-image: none;
      `;

    case 'green':
      return css`
        background-color: #21ba45;
        color: #fff;
        text-shadow: none;
        background-image: none;
      `;

    default:
      return null;
  }
};

const disabled = ({ disabled }: ButtonProps) => {
  if (disabled) {
    return css`
      cursor: default;
      opacity: 0.45 !important;
      background-image: none !important;
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
      pointer-events: none !important;
    `;
  }
  return null;
};

const StyledButton = styled.button`
  font-size: 0.8rem;
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0, 0, 0, 0.6);
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  margin: 0 0.25em 0 0;
  padding: 0.78571429em 1.5em 0.78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 300;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 0.28571429rem;
  -webkit-box-shadow: 0 0 0 1px transparent inset,
    0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: opacity 0.1s ease, background-color 0.1s ease,
    color 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    background 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease, -webkit-box-shadow 0.1s ease;
  will-change: '';
  -webkit-tap-highlight-color: transparent;
  overflow: visible;

  ${disabled};
  ${color};
  ${circular};
  ${useIcon};
  ${size};
`;
// ${({ size }: { size: number }) => size && `font-size: ${sizes[size]}`};

export interface ButtonProps {
  color?: string;
  size?: string;
  disabled?: boolean;
  circular?: boolean;
  useIcon?: boolean;
  onClick?: () => void;
  children: any;
}

const Button: React.StatelessComponent<ButtonProps> = ({
  children,
  onClick,
  ...other
}) => (
  <StyledButton onClick={onClick} {...other}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  circular: PropTypes.bool,
  useIcon: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  useIcon: false,
  color: '',
  size: '',
  disabled: false,
  circular: false,
  onClick: () => {},
};

export default Button;
