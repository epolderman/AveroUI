import { CLOSE_CHECK, ASYNC_ERROR } from '../actions/types';
import { ROOT_URL, AUTH_KEY } from '../actions/index';
import { Observable } from 'rxjs';

//epic
export const closeCheckEpic = action$ =>
  action$.ofType(CLOSE_CHECK).mergeMap(action =>
    Observable.ajax({
      method: 'PUT',
      url: ROOT_URL + '/checks/' + action.payload + '/close',
      body: action.payload,
      crossDomain: true,
      headers: {
        Authorization: AUTH_KEY,
      },
      body: JSON.stringify(action.payload),
    })
      .map(promise => action.callbacktoInvoke())
      .catch(error =>
        Observable.of({
          type: ASYNC_ERROR,
        })
      )
  );
