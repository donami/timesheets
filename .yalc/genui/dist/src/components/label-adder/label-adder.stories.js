import React from 'react';
import { storiesOf } from '@storybook/react';
import LabelAdder from './label-adder';
import { wInfo } from '../../../utils';
storiesOf('Components/LabelAdder', module).addWithJSX('basic LabelAdder', wInfo("\n\n  ### Notes\n\n  This is a standard <LabelAdder />\n\n  ### Usage\n  ~~~js\n  <LabelAdder name=\"fas fa-adjust\" />\n  ~~~")(function () { return React.createElement(LabelAdder, { labels: ['test', 'test2'] }); }));
//# sourceMappingURL=label-adder.stories.js.map