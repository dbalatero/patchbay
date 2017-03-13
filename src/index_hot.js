import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App/App';
import configureStore from './store/configure_store';

const store = configureStore();

const rootEl = document.getElementById('react-root');
ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  rootEl // eslint-disable-line comma-dangle
);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./components/App/App').default;  // eslint-disable-line global-require
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <NextApp />
        </AppContainer>
      </Provider>,
      rootEl // eslint-disable-line comma-dangle
    );
  });
}
