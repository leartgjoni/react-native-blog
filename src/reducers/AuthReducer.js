import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  NAME_CHANGED,
  REPASSWORD_CHANGED,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  token: '',
  error: '',
  loading: false,
  loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case EMAIL_CHANGED:
       return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
    case REPASSWORD_CHANGED:
        return { ...state, password_confirmation: action.payload };
    case LOGIN_USER:
        return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload.user, token: action.payload.token, loggedIn: true };
    case LOGIN_USER_FAIL:
        return { ...state, error: action.payload, password: '', password_confirmation: '', loading: false };
    case LOGOUT_USER:
        return { ...state, token: '', user: null, loggedIn: false };
    default:
      return state;
  }
};
