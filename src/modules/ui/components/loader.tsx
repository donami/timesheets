import React, { Component } from 'react';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {
  transitionState: string;
  duration: number;
};

class Loader extends Component<Props> {
  render() {
    return (
      <Container
        transitionState={this.props.transitionState}
        duration={this.props.duration}
      >
        <div className="loader">
          <div className="loader-inner">
            <svg
              version="1.1"
              id="Layer_1"
              xmlBase="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="72px"
              height="90px"
              viewBox="0 0 24 30"
              xmlSpace="preserve"
            >
              <rect
                x="0"
                y="10"
                width="4"
                height="10"
                fill="#333"
                opacity="0.2"
              >
                <animate
                  attributeName="opacity"
                  attributeType="XML"
                  values="0.2; 1; .2"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="height"
                  attributeType="XML"
                  values="10; 20; 10"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  values="10; 5; 10"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x="8"
                y="10"
                width="4"
                height="10"
                fill="#333"
                opacity="0.2"
              >
                <animate
                  attributeName="opacity"
                  attributeType="XML"
                  values="0.2; 1; .2"
                  begin="0.15s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="height"
                  attributeType="XML"
                  values="10; 20; 10"
                  begin="0.15s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  values="10; 5; 10"
                  begin="0.15s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                x="16"
                y="10"
                width="4"
                height="10"
                fill="#333"
                opacity="0.2"
              >
                <animate
                  attributeName="opacity"
                  attributeType="XML"
                  values="0.2; 1; .2"
                  begin="0.3s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="height"
                  attributeType="XML"
                  values="10; 20; 10"
                  begin="0.3s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  values="10; 5; 10"
                  begin="0.3s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>
        </div>
      </Container>
    );
  }
}

export default Loader;

const Container = withProps<Props>(styled.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 25;
  background: #f8f9fd;
  transition: opacity ${props => props.duration}ms ease-in-out;
  opacity: 0;

  ${props => {
    if (props.transitionState === 'entering') {
      return css`
        opacity: 0;
      `;
    }
    if (props.transitionState === 'entered') {
      return css`
        opacity: 1;
      `;
    }
    if (props.transitionState === 'exiting') {
      return css`
        opacity: 1;
      `;
    }
    if (props.transitionState === 'exited') {
      return css`
        opacity: 0;
      `;
    }
    return null;
  }}

  .loader {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg path,
  svg rect {
    fill: #6746c9;
  }
`;
