import { ADD_ITEM, ASYNC_ERROR } from '../actions/types';
import { ROOT_URL, AUTH_KEY } from '../actions/index';
import { Observable } from 'rxjs';

//epic
export const addMenuItemEpic = action$ =>
  action$.ofType(ADD_ITEM).mergeMap(action =>
    Observable.ajax({
      method: 'PUT',
      url: ROOT_URL + '/checks/' + action.check + '/addItem',
      body: action.payload.fullItemID,
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
