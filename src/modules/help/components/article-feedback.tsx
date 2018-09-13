import React from 'react';
import { Icon } from 'genui';
import {
  compose,
  withStateHandlers,
  StateHandler,
  StateHandlerMap,
  withHandlers,
} from 'recompose';

import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {
  onFeedback: (articleId: number, response: string) => any;
  articleId: number;
};

type State = { responded: string | null };

type StateHandlerProps = StateHandlerMap<State> & {
  respond: (response: string) => StateHandler<State>;
};

type HandlerProps = {
  onGiveFeedback: (response: string) => void;
};

type EnhancedProps = Props & State & StateHandlerProps & HandlerProps;

const ArticleFeedback: React.SFC<EnhancedProps> = ({
  responded,
  onGiveFeedback,
}) => (
  <Container>
    <Label>Did this answer your question?</Label>

    <ResponseList>
      <ResponseAction
        value="negative"
        responded={responded}
        type="button"
        onClick={() => onGiveFeedback('negative')}
      >
        <Icon name="far fa-frown" size="3x" title="No" />
      </ResponseAction>
      <ResponseAction
        value="neutral"
        responded={responded}
        type="button"
        onClick={() => onGiveFeedback('neutral')}
      >
        <Icon name="far fa-meh" size="3x" title="Not really" />
      </ResponseAction>
      <ResponseAction
        value="positive"
        responded={responded}
        type="button"
        onClick={() => onGiveFeedback('positive')}
      >
        <Icon name="far fa-smile" size="3x" title="Yes" />
      </ResponseAction>
    </ResponseList>
  </Container>
);

const enhance = compose<EnhancedProps, Props>(
  withStateHandlers<State, StateHandlerProps, Props>(
    props => ({
      ...props,
      responded: null,
    }),
    {
      respond: (state, props) => (response: string) => ({
        responded: response,
      }),
    }
  ),
  withHandlers<EnhancedProps, HandlerProps>({
    onGiveFeedback: ({ respond, responded, articleId, onFeedback }) => (
      response: string
    ) => {
      if (responded && responded === response) {
        return;
      }

      onFeedback(articleId, response);

      respond(response);
    },
  })
);

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

export default enhance(ArticleFeedback);
