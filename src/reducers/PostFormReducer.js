import {
  POST_UPDATE,
  POST_CREATE,
  POST_SAVE_SUCCESS,
  POST_FAIL,
  POST_FORM_RESET
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  subtitle: '',
  body: '',
  errorForm: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case POST_FAIL:
      return { ...state, errorForm: action.payload };
    case POST_CREATE:
      return INITIAL_STATE;
    case POST_SAVE_SUCCESS:
      return INITIAL_STATE;
    case POST_FORM_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
