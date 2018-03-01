import {
  POST_FETCH_SUCCESS,
  MY_POST_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  all: [], /*all posts */
  mine: []/*my posts */
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_FETCH_SUCCESS:
      return { ...state, all: action.payload };
    case MY_POST_FETCH_SUCCESS:
      return { ...state, mine: action.payload };
    default:
      return state;
  }
};
