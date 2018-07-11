import React from 'react';

import { storiesOf } from '@storybook/react';
import Box from './box';
import { wInfo } from '../../../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

storiesOf('Components/Box', module).addWithJSX(
  'basic Box',
  wInfo(`

  ### Notes

  This is a box

  ### Usage
  ~~~js
  <Box title="Box Header Title">
    Box content goes here
  </Box>
  ~~~`)(() => <Box title="Box Header Title">Box content goes here</Box>)
);
