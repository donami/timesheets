import React from 'react';
import { Link } from 'react-router-dom';

import styled from '../../../styled/styled-components';

type Props = {};

const NotFoundPage: React.SFC<Props> = () => {
  return (
    <Container>
      <h1>Page Not Found</h1>

      <p>Uh-oh! The page you are looking for does not exist.</p>

      <p>
        Click <Link to="/">here</Link> to go to the start page.
      </p>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  text-align: center;
  margin-top: 200px;
  font-size: 1.2em;

  a {
    text-decoration: none;
    color: #0366d6;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
`;
