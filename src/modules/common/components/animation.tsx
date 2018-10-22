import React, { Component } from 'react';

type Props = {
  animationIn: string;
  animationOut: string;
  isVisible: boolean;
  animateOnMount?: boolean;
};

type State = {
  animation?: string;
};

class Animation extends Component<Props> {
  state: State = {};

  static defaultProps = {
    animateOnMount: false,
  };

  componentWillMount() {
    if (this.props.animateOnMount) {
      this.setState({
        animation: this.props.isVisible
          ? this.props.animationIn
          : this.props.animationOut,
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isVisible === this.props.isVisible) {
      return;
    }
    this.setState({
      animation: nextProps.isVisible
        ? nextProps.animationIn
        : nextProps.animationOut,
    });
  }

  render() {
    const { children, isVisible } = this.props;

    if (!React.isValidElement(children)) {
      return null;
    }

    const classNames = ((children as any).props.className || '').split(' ');
    const style = (children as any).props.style || {};
    style.pointerEvents = isVisible ? 'all' : 'none';

    classNames.push('animated');
    classNames.push(this.state.animation);

    if (!this.state.animation) {
      style.opacity = isVisible ? 1 : 0;
    }

    return React.cloneElement(children as any, {
      ...children.props,
      style,
      className: classNames.join(' '),
    });
  }
}

export default Animation;
