import * as React from 'react';
import { connect } from 'react-redux';

import { TextManager } from '../../../services/text-manager';
import { getSelectedLanguage } from '../store/selectors';
import withTextManager from './with-text-manager';

type Props = {
  textManager: TextManager;
  text: string;
  language: string;
};

class Translate extends React.Component<Props> {
  render() {
    const translatedText = this.props.textManager.display(this.props.text);

    return <>{translatedText}</>;
  }
}

const mapStateToProps = (state: any) => ({
  language: getSelectedLanguage(state),
});

export default connect(mapStateToProps)(withTextManager(Translate));
