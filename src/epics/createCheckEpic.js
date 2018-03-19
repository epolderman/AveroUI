import { CREATE_CHECK, ASYNC_ERROR } from '../actions/types';
import { ROOT_URL, AUTH_KEY, completeOpenCheck } from '../actions/index';
import { Observable } from 'rxjs';

//epic
export const createCheckEpic = action$ =>
  action$.ofType(CREATE_CHECK).mergeMap(action =>
    Observable.ajax({
      method: 'POST',
      url: ROOT_URL + '/checks',
      body: action.payload,
      crossDomain: true,
      headers: {
        Authorization: AUTH_KEY,
      },
      body: JSON.stringify(action.payload),
    })
      .map(promise => completeOpenCheck(promise))
      .catch(error =>
        Observable.of({
          type: ASYNC_ERROR,
        })
      )
  );
