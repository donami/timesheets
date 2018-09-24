import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import { Input, Button } from 'genui';

import { Form, BackButton } from '../../common';
// import { recoverPassword } from '../store/actions';

type Props = {
  // recoverPassword(email: string): any;
};
type HandlerProps = {
  onSubmit(model: { email: string }): void;
};
type StateProps = {
  submitted: boolean;
};
type StateHandlers = { setSubmitted(submitted: boolean): void };
type EnhancedProps = Props & HandlerProps & StateProps & StateHandlers;

const ForgottenPasswordPage: React.SFC<EnhancedProps> = ({
  submitted,
  onSubmit,
}) => (
  <div>
    <h3>Recover Password</h3>

    {submitted ? (
      <>
        <p>
          An email with a verification link and information on how to reset your
          password has been sent to your email.
        </p>
        <Button to="/" color="green">
          Go Back
        </Button>
      </>
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

const enhance = compose<EnhancedProps, Props>(
  withState('submitted', 'setSubmitted', false),
  withHandlers<EnhancedProps, HandlerProps>({
    onSubmit: ({ setSubmitted }) => model => {
      // this.props.recoverPassword(model.email);
      console.log(model);

      setSubmitted(true);
    },
  })
);

export default enhance(ForgottenPasswordPage);

// export default connect(
//   undefined,
//   (dispatch: any) => bindActionCreators({ recoverPassword }, dispatch)
// )(ForgottenPasswordPage);
