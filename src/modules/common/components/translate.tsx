import * as React from 'react';

import { TextManager } from '../../../services/text-manager';
import withTextManager from './with-text-manager';

type Props = {
  textManager: TextManager;
  text: string;
};

class Translate extends React.Component<Props> {
  render() {
    const translatedText = this.props.textManager.display(this.props.text);

    return <>{translatedText}</>;
  }
}

export default withTextManager(Translate);
