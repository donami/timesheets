import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { withProps, css } from '../../../../styled/styled-components';

import ModalContent from './modal-content';
import ModalHeader from './modal-header';
import ModalActions from './modal-actions';

type Sizes = 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';

type Props = {
  trigger: any;
  size?: Sizes;
};

type State = Readonly<{
  open: boolean;
}>;

const initialState: State = {
  open: false,
};

const modalRoot = document.getElementById('modal');

export const ModalContext = React.createContext({
  overrideOnClick: (callback?: any) => {},
});

class Modal extends Component<Props, State> {
  readonly state = initialState;

  static Header = ModalHeader;
  static Content = ModalContent;
  static Actions = ModalActions;

  el: any;

  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    if (modalRoot) {
      modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (modalRoot) {
      modalRoot.removeChild(this.el);
    }
  }

  handleTriggerClick = () => {
    if (typeof this.props.trigger.props.onClick === 'function') {
      this.props.trigger.props.onClick();
    }

    this.setState({ open: !this.state.open });
  };

  closeModal = (callback?: any) => {
    if (typeof callback === 'function') {
      callback();
    }

    setTimeout(() => this.setState({ open: false }), 0);
  };

  render() {
    const { open } = this.state;

    const { trigger, size, children } = this.props;

    return [
      open
        ? ReactDOM.createPortal(
            <Dimmer open={this.state.open}>
              <ModalContext.Provider
                value={{ overrideOnClick: this.closeModal }}
              >
                <Container format={size}>
                  <CloseIcon
                    className="fas fa-times"
                    onClick={() => this.setState({ open: false })}
                  />
                  {children}
                </Container>
              </ModalContext.Provider>
            </Dimmer>,
            this.el,
            'portal'
          )
        : null,
      trigger
        ? React.cloneElement(trigger, {
            onClick: this.handleTriggerClick,
            key: 'trigger',
          })
        : null,
    ];
  }
}

export default Modal;

const Dimmer = withProps<{ open: boolean }, HTMLDivElement>(styled.div)`
  display: none;
  position: fixed;
  top: 0 !important;
  left: 0 !important;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.85);
  opacity: 0;
  line-height: 1;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-transition: background-color 0.5s linear;
  transition: background-color 0.5s linear;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  will-change: opacity;
  z-index: 1000;

  ${({ open }) =>
    open &&
    css`
      display: flex;
      opacity: 1;
    `}
`;

const Container = withProps<{ format?: Sizes }, HTMLDivElement>(styled.div)`
  width: 850px;
  margin: 0;

  z-index: 1001;
  text-align: left;
  background: #fff;
  border: none;
  -webkit-box-shadow: 1px 3px 3px 0 rgba(0, 0, 0, 0.2),
    1px 3px 15px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 3px 3px 0 rgba(0, 0, 0, 0.2),
    1px 3px 15px 2px rgba(0, 0, 0, 0.2);
  -webkit-transform-origin: 50% 25%;
  transform-origin: 50% 25%;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  border-radius: 0.28571429rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  will-change: top, left, margin, transform, opacity;

  ${props => {
    if (props.format === 'mini') {
      return css`
        width: 350px;
      `;
    }
    if (props.format === 'tiny') {
      return css`
        width: 510px;
      `;
    }
    if (props.format === 'small') {
      return css`
        width: 680px;
      `;
    }
    if (props.format === 'large') {
      return css`
        width: 1020px;
      `;
    }
    if (props.format === 'fullscreen') {
      return css`
        width: 95% !important;
        left: 0 !important;
        margin: 1em auto;
      `;
    }
    return null;
  }}
`;

const CloseIcon = styled.i`
  cursor: pointer;
  position: absolute;
  top: -2.5rem;
  right: -2.5rem;
  z-index: 1;
  opacity: 0.8;
  font-size: 1.25em;
  color: #fff;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.625rem 0 0 0;
`;
