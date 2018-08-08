import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {
  views: { name: string; show: boolean; view: any }[];
};

class ToggleView extends Component<Props> {
  render() {
    const { views } = this.props;

    return (
      <TransitionGroup>
        {views.filter(item => item.show).map((item, index) => (
          <Transition key={item.name} timeout={{ enter: 300, exit: 300 }}>
            {state => <View state={state}>{item.view}</View>}
          </Transition>
        ))}
      </TransitionGroup>
    );
  }
}

export default ToggleView;

const View = withProps<{ state: string }, HTMLDivElement>(styled.div)`
  transition: opacity 300ms ease-in-out;
  opacity: 1;

  ${props => {
    if (props.state === 'entering') {
      return css`
        opacity: 0;
        max-height: 0;
      `;
    }
    if (props.state === 'exiting' || props.state === 'exited') {
      return css`
        opacity: 0;
      `;
    }
    if (props.state === 'entered') {
      return css`
        opacity: 1;
        max-height: unset;
      `;
    }
    return null;
  }}
`;
