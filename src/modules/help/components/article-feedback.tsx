import React from 'react';
import { Icon } from 'genui';

import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {
  onFeedback: (articleId: number, response: string) => any;
  articleId: number;
};

type State = Readonly<{
  responded: string | null;
}>;

const initialState: State = {
  responded: null,
};

class ArticleFeedback extends React.Component<Props, State> {
  state = initialState;

  giveFeedback = (response: string) => {
    const { responded } = this.state;

    if (responded && responded === response) {
      return;
    }

    this.props.onFeedback(this.props.articleId, response);

    this.setState({ responded: response });
  };

  render() {
    const { responded } = this.state;

    return (
      <Container>
        <Label>Did this answer your question?</Label>

        <ResponseList>
          <ResponseAction
            value="negative"
            responded={responded}
            type="button"
            onClick={() => this.giveFeedback('negative')}
          >
            <Icon name="far fa-frown" size="3x" title="No" />
          </ResponseAction>
          <ResponseAction
            value="neutral"
            responded={responded}
            type="button"
            onClick={() => this.giveFeedback('neutral')}
          >
            <Icon name="far fa-meh" size="3x" title="Not really" />
          </ResponseAction>
          <ResponseAction
            value="positive"
            responded={responded}
            type="button"
            onClick={() => this.giveFeedback('positive')}
          >
            <Icon name="far fa-smile" size="3x" title="Yes" />
          </ResponseAction>
        </ResponseList>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 20px 0;
  text-align: center;
  background-color: #f0f3f5;
  color: #777;
`;

const Label = styled.div`
  font-size: 1.1em;
  margin-bottom: 20px;
`;

const ResponseList = styled.div``;

const ResponseAction = withProps<
  { responded: string | null; value: string },
  HTMLButtonElement
>(styled.button)`
  background: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  margin: 0 10px;

  &:hover {
    -webkit-transform: scale(1.32);
    transform: scale(1.32);
    -webkit-transition: -webkit-transform 0.04s;
    transition: -webkit-transform 0.04s;
    transition: transform 0.04s;
    transition: transform 0.04s, -webkit-transform 0.04s;
  }

  i,
  svg {
    ${({ responded, value }) =>
      responded &&
      responded === value &&
      css`
        color: #7d45fc;
        transform: scale(1.48);
      `}
  }

`;

export default ArticleFeedback;
