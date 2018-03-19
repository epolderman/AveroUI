import { FETCH_CHECK, ASYNC_ERROR } from '../actions/types';
import { ROOT_URL, AUTH_KEY, getCheck, setCheck } from '../actions/index';
import { Observable } from 'rxjs';

//epic
export const fetchCheckEpic = action$ =>
  action$.ofType(FETCH_CHECK).mergeMap(action =>
    Observable.ajax({
      method: 'GET',
      url: ROOT_URL + '/checks/' + action.payload,
      crossDomain: true,
      headers: {
        Authorization: AUTH_KEY,
      },
      body: JSON.stringify(action.payload),
    })
      .map(promise => setCheck(promise))
      .catch(error =>
        Observable.of({
          type: ASYNC_ERROR,
        })
      )
  );
