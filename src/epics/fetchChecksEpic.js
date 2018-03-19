import { FETCH_CHECKS, ASYNC_ERROR } from '../actions/types';
import { ROOT_URL, AUTH_KEY } from '../Utils/keys';
import { setChecks } from '../actions/index';
import { Observable } from 'rxjs';

//epic
export const fetchChecksEpic = action$ =>
  action$.ofType(FETCH_CHECKS).mergeMap(({ payload }) =>
    Observable.ajax({
      method: 'GET',
      url: ROOT_URL + '/checks',
      crossDomain: true,
      headers: {
        Authorization: AUTH_KEY,
      },
      body: JSON.stringify(payload),
    })
      .map(promise => setChecks(promise))
      .catch(error =>
        Observable.of({
          type: ASYNC_ERROR,
        })
      )
  );
