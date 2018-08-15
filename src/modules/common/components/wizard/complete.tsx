import React, { Component } from 'react';
import { Button } from 'genui';

type State = Readonly<{}>;
type Props = {};

const initialState: State = {};

class WizardComplete extends Component<Props, State> {
  readonly state = initialState;

  render() {
    return (
      <div>
        <h3>Success!</h3>
        <p>
          Your application is installed and configured. You may now proceed to
          the authentication page to sign in with the account you just created.
        </p>

        <div>
          <Button to="/auth" color="green">
            Proceed to login
          </Button>
        </div>
      </div>
    );
  }
}

export default WizardComplete;
