import * as React from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import ReduxToastr from 'react-redux-toastr';

import store from './store';
import { Routing } from './modules/common';
import { theme } from './styled/theme';

injectGlobal`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    color: ${theme.textColor};
  }
  a {
    color: ${theme.linkColor};
  }
  #root {
    height: 100%;
  }
`;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
          <Routing />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
