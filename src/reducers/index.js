import { combineReducers } from 'redux';
import tablesReducer from './tablesReducer';
import checksReducer from './checksReducer';
import itemsReducer from './itemsReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  tables: tablesReducer,
  checks: checksReducer,
  items: itemsReducer,
  error: errorReducer
});
