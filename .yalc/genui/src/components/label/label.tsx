import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

export interface LabelProps {
  children: any;
  color?: string;
}

const StyledLabel = styled.span`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  padding: 2px 6px;
  border-radius: 20px;
  color: #fff;
  font-size: 0.8rem;
  background: #00b5ad;
  margin: 0 3px;

  ${props => props.color === 'orange' && 'background: #cf590c !important;'};
`;

const Label: React.StatelessComponent<LabelProps> = ({
  children,
  ...other
}: LabelProps) => <StyledLabel {...other}>{children}</StyledLabel>;

Label.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

// Label.defaultProps = {
//   color: null,
// };

export default Label;
