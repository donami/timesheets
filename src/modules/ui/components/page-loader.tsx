import React, { Component } from 'react';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {};

class Loader extends Component<Props> {
  render() {
    return (
      <Container>
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

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  z-index: 25;
  background: #f8f9fd;

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
