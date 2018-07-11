import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from './rootReducer';
import rootSaga from './sagas';
import textManager from '../services/text-manager';

const loggerMiddleware = createLogger();
export const history = createHistory();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const auth = localStorage.getItem('serializedUser');

let initialState = {};
if (auth) {
  initialState = {
    auth: JSON.parse(auth),
  };
}

function createTranslationsMiddleware(service: any) {
  return ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    if (action.type === 'SELECT_LANGUAGE') {
      service.changeLanguage(action.payload.language);
    }
    return next(action);
  };
}

const myTranslationsMiddleware = createTranslationsMiddleware(textManager);

const store = createStore(
  connectRouter(history)(rootReducer),
  // window.devToolsExtension(),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      myTranslationsMiddleware,
      sagaMiddleware,
      loggerMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);

export default store;
