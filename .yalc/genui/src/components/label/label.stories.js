import React from 'react';

import { storiesOf } from '@storybook/react';
import Label from './label';
import { wInfo } from '../../../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

storiesOf('Components/Label', module).addWithJSX(
  'basic Label',
  wInfo(`

  ### Notes

  This is a Label

  ### Usage
  ~~~js
  <Label color="orange">
    Label content goes here
  </Label>
  ~~~`)(() => <Label color="orange">Label content goes here</Label>)
);
