import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createEpicMiddleware from 'redux-observable'; //here
import reducers from './reducers';
import { Provider } from 'react-redux';
import { root } from './epics';

//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const epicMiddleware = createEpicMiddleware(root);
const store = createStore(reducers, {}, applyMiddleware(epicMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
