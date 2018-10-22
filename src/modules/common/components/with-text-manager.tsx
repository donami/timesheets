import * as React from 'react';
import { TextManagerContext } from './routing';
import { TextManager } from '../../../services/text-manager';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

interface WithTextManagerProps {
  textManager: TextManager;
}

const withTextManager = <P extends WithTextManagerProps>(
  Component: React.ComponentType<P>
) =>
  class WithTextManager extends React.Component<
    Subtract<P, WithTextManagerProps>
  > {
    render() {
      return (
        <TextManagerContext.Consumer>
          {textManager => (
            <Component {...this.props} textManager={textManager} />
          )}
        </TextManagerContext.Consumer>
      );
    }
  };

export default withTextManager;
