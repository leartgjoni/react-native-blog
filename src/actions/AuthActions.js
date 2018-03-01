import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  NAME_CHANGED,
  REPASSWORD_CHANGED,
  LOGOUT_USER
} from './types';

const ROOT_URL = 'http://blog-react-native.lersoft.com/api';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
      type: PASSWORD_CHANGED,
      payload: text
  };
};

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const repasswordChanged = (text) => {
  return {
    type: REPASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
  dispatch({ type: LOGIN_USER });
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/login`, { email, password })
      .then(response => {
        loginUserSuccess(dispatch, response.data);
      })
      .catch((error) => {
        // If request is bad...
        // - Show an error to the user
        loginUserFail(dispatch, error.response.data.error);
      });
  };
};

export const registerUser = ({ name, email, password, password_confirmation }) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { name, email, password, password_confirmation })
      .then(response => {
        loginUserSuccess(dispatch, response.data);
      })
      .catch((error) => {
        loginUserFail(dispatch, error.response.data.error);
      });
  };
}

const loginUserSuccess = (dispatch, data) => {
  // - Save the JWT token
  try {
    const auth = { token: data.token, user: data.user };
    AsyncStorage.setItem('@BlogStore:auth', JSON.stringify(auth));
  } catch (error) {
    console.log('Error saving token', error);
  }

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { user: data.user, token: data.token }
  });

  Actions.main({ type: 'reset' });
};

const loginUserFail = (dispatch, error) => {
  console.log(error);
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

export const logoutUser = () => {
  AsyncStorage.removeItem('@BlogStore:auth');
  Actions.postList({ type: 'reset' });
  return {
    type: LOGOUT_USER
  };
};
