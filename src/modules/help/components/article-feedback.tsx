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
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

type Props = {
  feedback: any;
  articleId: number;
};
type HandlerProps = {
  onGiveFeedback: (response: string) => void;
};
type EnhancedProps = Props & State & StateHandlerProps & HandlerProps;

type State = { responded: string | null };
type StateHandlerProps = StateHandlerMap<State> & {
  respond: (response: string) => StateHandler<State>;
};

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

const UPDATE_FEEDBACK = gql`
  mutation updateFeedback(
    $id: ID!
    $positive: Int
    $neutral: Int
    $negative: Int
  ) {
    updateFeedback(
      id: $id
      positive: $positive
      neutral: $neutral
      negative: $negative
    ) {
      id
      neutral
      positive
      negative
      article {
        id
      }
    }
  }
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(UPDATE_FEEDBACK, { name: 'updateFeedback' }),
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
    onGiveFeedback: ({ respond, responded, feedback, updateFeedback }) => (
      response: string
    ) => {
      if (responded && responded === response) {
        return;
      }

      updateFeedback({
        variables: {
          id: feedback.id,
          positive: feedback.positive,
          negative: feedback.negative,
          neutral: feedback.neutral,
          [response]: feedback[response] + 1,
        },
      });

      respond(response);
    },
  })
);

export default enhance(ArticleFeedback);

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
