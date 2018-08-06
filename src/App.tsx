import * as React from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import ReduxToastr from 'react-redux-toastr';

import store from './store';
import { Routing } from './modules/common';

const baseFontColor = '#232c55';
const baseLinkColor = '#763FFE';

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
    color: ${baseFontColor};
  }
  a {
    color: ${baseLinkColor};
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
