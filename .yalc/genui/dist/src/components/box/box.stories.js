import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from './box';
import { wInfo } from '../../../utils';
storiesOf('Components/Box', module).addWithJSX('basic Box', wInfo("\n\n  ### Notes\n\n  This is a box\n\n  ### Usage\n  ~~~js\n  <Box title=\"Box Header Title\">\n    Box content goes here\n  </Box>\n  ~~~")(function () { return React.createElement(Box, { title: "Box Header Title" }, "Box content goes here"); }));
//# sourceMappingURL=box.stories.js.map