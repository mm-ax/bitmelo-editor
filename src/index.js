
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import debounce from 'lodash/debounce';
import thunk from 'redux-thunk';

import App from './components/App/App';
import reducers from './state/index';
import storeRegistry from './state/storeRegistry';

import { saveStateToLocalStorage } from './utils/Saving/localStorage';

import 'normalize.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducers, undefined, composeEnhancers(applyMiddleware( thunk ) ));

const saveDebounced = debounce( saveStateToLocalStorage, 1000 );
store.subscribe( () => {
  saveDebounced( store.getState() );
} );

storeRegistry.register( store );

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById( 'root' ),
);
