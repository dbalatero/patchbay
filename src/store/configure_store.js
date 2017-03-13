import { createStore, applyMiddleware, compose } from 'redux';
import createLoggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';

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

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(middleware),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
