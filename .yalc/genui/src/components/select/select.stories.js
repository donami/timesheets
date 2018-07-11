import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';

import Select from './select';
import { wInfo } from '../../../utils';

const items = [
  {
    value: 'angular',
    label: 'Angular',
  },
  {
    value: 'css',
    label: 'CSS',
  },
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'design',
    label: 'Design',
  },
];

storiesOf('Components/Select', module).addWithJSX(
  'basic Select',
  wInfo(`

  ### Notes

  This is a standard <Select />

  ### Usage
  ~~~js
  <Select name="fas fa-adjust" />
  ~~~`)(() => <Select items={items} />)
);
