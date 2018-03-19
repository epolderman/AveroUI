import { FETCH_ITEMS_COMPLETE } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ITEMS_COMPLETE:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
