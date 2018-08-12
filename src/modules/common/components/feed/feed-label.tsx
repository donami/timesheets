import React from 'react';
import { Icon } from 'genui';

import styled from '../../../../styled/styled-components';

type Props = { image?: string; icon?: string };

const FeedLabel: React.SFC<Props> = ({ image, icon, children }) => {
  if (image) {
    return (
      <Container>
        <img src={image} alt="" />
      </Container>
    );
  }

  if (icon) {
    return (
      <Container>
        <Icon name={icon} />
      </Container>
    );
  }

  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: block;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 2.5em;
  height: auto;
  -ms-flex-item-align: stretch;
  align-self: center;
  text-align: left;

  img {
    width: 100%;
    height: auto;
    border-radius: 500rem;
  }

  i,
  svg {
    opacity: 1;
    font-size: 1.9em;
    width: 100%;
    padding: 0.25em;
    background: 0 0;
    border: none;
    border-radius: none;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export default FeedLabel;
