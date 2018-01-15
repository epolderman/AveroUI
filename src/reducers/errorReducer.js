import {CLEAR_MESSAGE,
        ASYNC_ERROR} from '../actions/types';

export default function(state = {message: "Empty"}, action)
{

      switch(action.type)
      {
        case ASYNC_ERROR:
        return {message: "Error: Promise Failed"};
        case CLEAR_MESSAGE:
        return {message: "Empty"};
        default:
        return state;
      }


}
