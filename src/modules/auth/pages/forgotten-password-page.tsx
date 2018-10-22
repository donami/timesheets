import React from 'react';
import { Query } from 'react-apollo';
import { compose, withHandlers, withState } from 'recompose';
import { Input, Button, Message } from 'genui';
import gql from 'graphql-tag';

import { Form, BackButton } from '../../common';
import ForgottenPassword from '../components/forgotten-password';

type Props = {};
type HandlerProps = {
  onSubmit(model: { email: string }): void;
};
type DataProps = {
  sendMail(options: any): any;
  createRecoveryCode(options: any): any;
};
type StateProps = {
  submitted: string | null;
};
type StateHandlers = { setSubmitted(submitted: string): void };
type EnhancedProps = Props &
  HandlerProps &
  StateProps &
  StateHandlers &
  DataProps;

const ForgottenPasswordPage: React.SFC<EnhancedProps> = ({
  submitted,
  onSubmit,
}) => (
  <div>
    <h3>Recover Password</h3>

    {submitted ? (
      <Query query={GET_USER_BY_EMAIL} variables={{ email: submitted }}>
        {({ loading, data }) => {
          if (loading) {
            return null;
          }
          if (data && data.allUsers.length) {
            return <ForgottenPassword user={data.allUsers[0]} />;
          }
          return (
            <Message negative>
              We could not find any user with that email address.
            </Message>
          );
        }}
      </Query>
    ) : (
      <Form onValidSubmit={onSubmit}>
        {formState => (
          <>
            <Form.Field
              name="email"
              label="Email"
              validations={{ isEmail: true, isRequired: true }}
            >
              <Input placeholder="john@email.com" />
            </Form.Field>

            <Button type="submit" disabled={!formState.isValid} color="green">
              Recover
            </Button>
            <BackButton>Cancel</BackButton>
          </>
        )}
      </Form>
    )}
  </div>
);

const GET_USER_BY_EMAIL = gql`
  query($email: String!) {
    allUsers(filter: { email: $email }) {
      id
      firstName
      email
    }
  }
`;

const enhance = compose<EnhancedProps, Props>(
  withState('submitted', 'setSubmitted', null),
  withHandlers<EnhancedProps, HandlerProps>({
    onSubmit: ({ setSubmitted }) => async model => {
      setSubmitted(model.email);
    },
  })
);

export default enhance(ForgottenPasswordPage);
