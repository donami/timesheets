import React from 'react';
import styled from '../../../../styled/styled-components';

const ChatLoader = () => {
  return (
    <Container>
      {/* <div>Loading...</div> */}

      <div className="loader">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          xmlSpace="preserve"
        >
          <path
            fill="#000"
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </Container>
  );
};

export default ChatLoader;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .loader {
    margin: 0 0 2em;
    height: 100px;
    width: 20%;
    text-align: center;
    padding: 1em;
    margin: 0 auto 1em;
    display: inline-block;
    vertical-align: top;
  }

  svg path,
  svg rect {
    fill: ${props => props.theme.primaryColor};
  }
`;
