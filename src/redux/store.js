import { createStore } from 'redux';
import rootReducer from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

export default createStore(rootReducer, preloadedState);
