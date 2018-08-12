import React from 'react';
import { ModalContext } from './modal';

type Props = {};

const ModalActions: React.SFC<Props> = ({ children }) => {
  return (
    <ModalContext.Consumer>
      {context => (
        <div>
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              const predefinedOnClick =
                (child as any).props.onClick || undefined;

              return React.cloneElement(child as any, {
                onClick: () => context.overrideOnClick(predefinedOnClick),
              });
            }
            return null;
          })}
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default ModalActions;

ModalActions.displayName = 'ModalActions';
