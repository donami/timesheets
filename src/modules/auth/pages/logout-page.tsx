import * as React from 'react';

type Props = {
  history: any;
};

class LogoutPage extends React.Component<Props> {
  componentWillMount() {
    localStorage.removeItem('token');
  }
  componentDidMount() {
    this.props.history.goBack();
  }

  render() {
    return null;
  }
}

export default LogoutPage;
