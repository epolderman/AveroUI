import { fetchTables } from '../actions/index';
import { FETCH_TABLES, ASYNC_ERROR } from '../actions/types';
import { combineEpics } from 'redux-observable';
import { ROOT_URL, AUTH_KEY } from '../actions/index';
import { ajax } from 'rxjs';

//this is an EPIC
//takes a stream of action and returns a stream of actions
export const fetchTablesEpic = action$ =>
  action$
    .ofType(FETCH_TABLES)
    .switchMap(action =>
      ajax.get(ROOT_URL + '/tables', { headers: { Authorization: AUTH_KEY } })
    )
    .then(response => response.json())
    .map(response => ({ type: FETCH_TABLES, payload: response.data }));
