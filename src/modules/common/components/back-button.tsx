import React from 'react';
import { Button } from 'genui';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = {
  history: any;
  disabled?: boolean;
};
type EnhancedProps = Props & RouteComponentProps<{}>;

const BackButton: React.SFC<EnhancedProps> = ({
  children,
  history,
  disabled,
}) => (
  <Button
    type="button"
    onClick={() => history.goBack()}
    disabled={disabled || false}
  >
    {children}
  </Button>
);

export default withRouter(BackButton);
