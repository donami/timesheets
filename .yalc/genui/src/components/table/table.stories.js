import React from 'react';

import { storiesOf } from '@storybook/react';
import Table from './table';
import { wInfo } from '../../../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

storiesOf('Components/Table', module).addWithJSX(
  'basic Table',
  wInfo(`

  ### Notes

  This is a table

  ### Usage
  ~~~js
  const timesheets = [
    {
      id: <a href="/">82131</a>,
      periodEnd: '30-Jun-2018',
      status: 'saved',
    },
  ];

  <Table 
    headings={['ID', 'Period End', 'Status']} 
    items={timesheets}
  />
  ~~~`)(() => {
    const timesheets = [
      {
        id: <a href="/">82131</a>,
        periodEnd: '30-Jun-2018',
        status: 'saved',
      },
    ];

    return (
      <Table headings={['ID', 'Period End', 'Status']} items={timesheets} />
    );
  })
);
