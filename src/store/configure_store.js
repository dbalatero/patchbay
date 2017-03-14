import { createStore, applyMiddleware, compose } from 'redux';
import createLoggerMiddleware from 'redux-logger';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';
import localForage from 'localforage';
import _ from 'lodash';

import rootReducer from '../reducers';
import patchBayRecords from '../records/patch_bay_records';

export default function configureStore(initialState) {
  const middlewares = [];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLoggerMiddleware({
      stateTransformer(state) {
        return state.toJS();
      },
    }));
  }

  const middleware = applyMiddleware(...middlewares);

  const enhancers = [
    autoRehydrate(),
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(middleware, ...enhancers),
  );

  const records = _.values(patchBayRecords);

  persistStore(store, {
    records,
    storage: localForage,
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
