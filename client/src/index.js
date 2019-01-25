import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import reducers from './store/reducers';

import App from './App';

/* eslint-disable */
const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-enable */
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StripeProvider apiKey="pk_test_WpVP7JIooYa7iL1KMBkmADRX">
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
