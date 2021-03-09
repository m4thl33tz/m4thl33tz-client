import { SET_PLAYER } from '../actions/userActions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player: action.payload,
      };
    default:
      return state;
  }
}
