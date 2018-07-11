import React from 'react';

import { storiesOf } from '@storybook/react';
import Button from './button';
import { wInfo } from '../../../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

storiesOf('Components/Button', module)
  .addWithJSX(
    'basic Button',
    wInfo(`

  ### Notes

  This is a standard <Button />

  ### Usage
  ~~~js
  <Button color="teal">
    Button
  </Button>
  ~~~`)(() => <Button>Button</Button>)
  )
  .addWithJSX(
    'colored Button',
    wInfo(`

  ### Notes

  Accepted colors are:
  - blue
  - red
  - teal
  - green

  ### Usage
  ~~~js
  <Button color="teal">
    Button
  </Button>
  ~~~`)(() => <Button color="teal">Button</Button>)
  )
  .addWithJSX(
    'circular Button',
    wInfo(`

  ### Notes

  Circular <Button />

  ### Usage
  ~~~js
  <Button circular>
    Button
  </Button>
  ~~~`)(() => <Button circular>Button</Button>)
  )
  .addWithJSX(
    'sizes Button',
    wInfo(`

  ### Notes

  ##### Valid sizes are:
  - mini
  - tiny
  - small
  - medium
  - large
  - big
  - huge
  - massive

  ### Usage
  ~~~js
  <Button size="huge">
    Button
  </Button>
  ~~~`)(() => <Button size="huge">Button</Button>)
  );
