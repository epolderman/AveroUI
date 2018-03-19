import {
  FETCH_CHECKS_COMPLETE,
  FETCH_CHECK_COMPLETE,
  CREATE_CHECK_COMPLETE,
} from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CHECK_COMPLETE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CHECK_COMPLETE:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_CHECKS_COMPLETE:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
