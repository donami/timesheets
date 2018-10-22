import React from 'react';
import { Button } from 'genui';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = {
  history: any;
};
type EnhancedProps = Props & RouteComponentProps<{}>;

const BackButton: React.SFC<EnhancedProps> = ({ children, history }) => (
  <Button type="button" onClick={() => history.goBack()}>
    {children}
  </Button>
);

export default withRouter(BackButton);
