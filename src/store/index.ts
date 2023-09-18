import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import {MODULE_NAME as dataModuleName, tasksReducer} from './data';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  [dataModuleName]: tasksReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
