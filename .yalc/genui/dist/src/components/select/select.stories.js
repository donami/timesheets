import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './select';
import { wInfo } from '../../../utils';
var items = [
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
storiesOf('Components/Select', module).addWithJSX('basic Select', wInfo("\n\n  ### Notes\n\n  This is a standard <Select />\n\n  ### Usage\n  ~~~js\n  <Select name=\"fas fa-adjust\" />\n  ~~~")(function () { return React.createElement(Select, { items: items }); }));
//# sourceMappingURL=select.stories.js.map