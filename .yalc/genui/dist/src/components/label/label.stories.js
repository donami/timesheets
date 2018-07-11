import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './label';
import { wInfo } from '../../../utils';
storiesOf('Components/Label', module).addWithJSX('basic Label', wInfo("\n\n  ### Notes\n\n  This is a Label\n\n  ### Usage\n  ~~~js\n  <Label color=\"orange\">\n    Label content goes here\n  </Label>\n  ~~~")(function () { return React.createElement(Label, { color: "orange" }, "Label content goes here"); }));
//# sourceMappingURL=label.stories.js.map