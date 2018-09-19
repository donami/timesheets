import React, { Component } from 'react';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {
  trigger: any;
  content: any;
  onClose?: any;
};

type State = Readonly<{
  open: boolean;
}>;

const initialState: State = {
  open: false,
};

class Popup extends Component<Props, State> {
  readonly state = initialState;
  node: HTMLElement | null;

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e: any) => {
    // If click is inside node, return
    if (!this.node || this.node.contains(e.target)) {
      return;
    }

    this.setState({ open: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  handleTriggerClick = () => {
    if (typeof this.props.trigger.props.onClick === 'function') {
      this.props.trigger.props.onClick();
    }

    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;
    return (
      <Container innerRef={node => (this.node = node)} className="popup">
        {React.cloneElement(this.props.trigger, {
          onClick: this.handleTriggerClick,
        })}

        <Content open={open}>{open && <>{this.props.content}</>}</Content>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
`;

const Content = withProps<{ open: boolean }, HTMLDivElement>(styled.div)`
  position: absolute;
  z-index: 1900;
  border: 1px solid #d4d4d5;
  line-height: 1.4285em;
  max-width: 350px;
  background: #fff;
  padding: 0.833em 1em;
  font-weight: 400;
  font-style: normal;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  -webkit-box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 1s ease;
  transition: opacity 1s ease;

  left: -290px;
  width: 300px

  ${({ open }) =>
    open &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export default Popup;
