import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';

import Icon from './icon';
import { wInfo } from '../../../utils';

storiesOf('Components/Icon', module).addWithJSX(
  'basic Icon',
  wInfo(`

  ### Notes

  This is a standard <Icon />

  ### Usage
  ~~~js
  <Icon name="fas fa-adjust" />
  ~~~`)(() => <Icon name="fas fa-adjust" />)
);
