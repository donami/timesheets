import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';

import LabelAdder from './label-adder';
import { wInfo } from '../../../utils';

storiesOf('Components/LabelAdder', module).addWithJSX(
  'basic LabelAdder',
  wInfo(`

  ### Notes

  This is a standard <LabelAdder />

  ### Usage
  ~~~js
  <LabelAdder name="fas fa-adjust" />
  ~~~`)(() => <LabelAdder labels={['test', 'test2']} />)
);
