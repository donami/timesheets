import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from './rootReducer';
import rootSaga from './sagas';
import textManager from '../services/text-manager';
import Api from '../services/api';

const loggerMiddleware = createLogger();
export const history = createHistory();

const monitor = window['__SAGA_MONITOR_EXTENSION__'];

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor });

const initialState = {};

function createTranslationsMiddleware(service: any) {
  return ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    if (action.type === 'SELECT_LANGUAGE') {
      service.changeLanguage(action.payload.language);
    }
    return next(action);
  };
}

const myTranslationsMiddleware = createTranslationsMiddleware(textManager);

function checkAuthMiddleware() {
  return ({ dispatch, getState }: any) => (next: any) => async (
    action: any
  ) => {
    const { auth: authState, common: commonState } = getState();

    if (
      authState.isAuthed === false &&
      localStorage.getItem('token') &&
      action.type !== 'AUTH_REQUEST' &&
      action.type !== 'ON_INIT'
    ) {
      const response = await Api.verifyToken();

      if (!response.result) {
        next({
          type: 'AUTH_FAILURE',
        });
      } else {
        next({
          payload: { ...response },
          type: 'AUTH_SUCCESS',
        });
      }
    }

    if (action.type !== 'ON_INIT' && commonState.initialized === false) {
      next({
        type: 'ON_INIT',
      });
    }

    return next(action);
  };
}

const store = createStore(
  connectRouter(history)(rootReducer),
  // window.devToolsExtension(),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      myTranslationsMiddleware,
      checkAuthMiddleware(),
      sagaMiddleware,
      loggerMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);

export default store;
