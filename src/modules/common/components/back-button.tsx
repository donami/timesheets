import React, { Component } from 'react';
import { Button } from 'genui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack } from 'connected-react-router';

type Props = {
  goBack: () => any;
};

class BackButton extends Component<Props> {
  render() {
    const { children, goBack } = this.props;

    return (
      <Button type="button" onClick={() => goBack()}>
        {children}
      </Button>
    );
  }
}

export default connect(
  undefined,
  (dispatch: any) => bindActionCreators({ goBack }, dispatch)
)(BackButton);
