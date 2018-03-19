import { FETCH_ITEMS, ASYNC_ERROR } from '../actions/types';
import { ROOT_URL, AUTH_KEY, setItems } from '../actions/index';
import { Observable } from 'rxjs';

//epic
export const fetchItemsEpic = action$ =>
  action$.ofType(FETCH_ITEMS).mergeMap(action =>
    Observable.ajax({
      method: 'GET',
      url: ROOT_URL + '/items',
      crossDomain: true,
      headers: {
        Authorization: AUTH_KEY,
      },
      body: JSON.stringify(action.payload),
    })
      .map(promise => setItems(promise))
      .catch(error =>
        Observable.of({
          type: ASYNC_ERROR,
        })
      )
  );
