import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './button';
import { wInfo } from '../../../utils';
storiesOf('Components/Button', module)
    .addWithJSX('basic Button', wInfo("\n\n  ### Notes\n\n  This is a standard <Button />\n\n  ### Usage\n  ~~~js\n  <Button color=\"teal\">\n    Button\n  </Button>\n  ~~~")(function () { return React.createElement(Button, null, "Button"); }))
    .addWithJSX('colored Button', wInfo("\n\n  ### Notes\n\n  Accepted colors are:\n  - blue\n  - red\n  - teal\n  - green\n\n  ### Usage\n  ~~~js\n  <Button color=\"teal\">\n    Button\n  </Button>\n  ~~~")(function () { return React.createElement(Button, { color: "teal" }, "Button"); }))
    .addWithJSX('circular Button', wInfo("\n\n  ### Notes\n\n  Circular <Button />\n\n  ### Usage\n  ~~~js\n  <Button circular>\n    Button\n  </Button>\n  ~~~")(function () { return React.createElement(Button, { circular: true }, "Button"); }))
    .addWithJSX('sizes Button', wInfo("\n\n  ### Notes\n\n  ##### Valid sizes are:\n  - mini\n  - tiny\n  - small\n  - medium\n  - large\n  - big\n  - huge\n  - massive\n\n  ### Usage\n  ~~~js\n  <Button size=\"huge\">\n    Button\n  </Button>\n  ~~~")(function () { return React.createElement(Button, { size: "huge" }, "Button"); }));
//# sourceMappingURL=button.stories.js.map