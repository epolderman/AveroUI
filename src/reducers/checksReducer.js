import { FETCH_CHECKS_COMPLETE, CREATE_CHECK, FETCH_CHECK } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CHECK:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CHECK:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_CHECKS_COMPLETE:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
