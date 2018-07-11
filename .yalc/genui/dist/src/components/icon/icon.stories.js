import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from './icon';
import { wInfo } from '../../../utils';
storiesOf('Components/Icon', module).addWithJSX('basic Icon', wInfo("\n\n  ### Notes\n\n  This is a standard <Icon />\n\n  ### Usage\n  ~~~js\n  <Icon name=\"fas fa-adjust\" />\n  ~~~")(function () { return React.createElement(Icon, { name: "fas fa-adjust" }); }));
//# sourceMappingURL=icon.stories.js.map