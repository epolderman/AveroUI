import { FETCH_TABLES, FETCH_TABLES_COMPLETE } from '../actions/types';
import { ROOT_URL, AUTH_KEY } from '../actions/index';
import { Observable } from 'rxjs';

//action creators
export function getTables() {
  console.log('getTables()');
  return { type: FETCH_TABLES };
}

export function setTables(tables) {
  console.log('setTables()');
  return {
    type: FETCH_TABLES_COMPLETE,
    payload: tables.response,
  };
}

//epic
export const fetchTablesEpic = action$ =>
  action$.ofType(FETCH_TABLES).mergeMap(({ payload }) =>
    Observable.ajax({
      method: 'GET',
      url: ROOT_URL + '/tables',
      crossDomain: true,
      headers: {
        Authorization: AUTH_KEY,
      },
      body: JSON.stringify(payload),
    }).map(promise => setTables(promise))
  );
