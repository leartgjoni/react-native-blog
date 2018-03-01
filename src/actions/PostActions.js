import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  POST_UPDATE,
  POST_CREATE,
  POST_FAIL,
  POST_FETCH_SUCCESS,
  MY_POST_FETCH_SUCCESS,
  POST_SAVE_SUCCESS,
  POST_FORM_RESET
} from './types';

const ROOT_URL = 'http://blog-react-native.lersoft.com/api';

export const postUpdate = ({ prop, value }) => {
    return {
      type: POST_UPDATE,
      payload: { prop, value }
    };
};

export const postCreate = ({ token, title, subtitle, body }) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, {
      title,
      subtitle,
      body
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
      .then(response => {
        console.log(response);
        dispatch({ type: POST_CREATE });
        Actions.postList({ type: 'reset' });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch({ type: POST_FAIL, payload: error.response.data.error });
        Actions.postCreate();
      });
  };
};

export const postFetch = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
      .then(response => {
        dispatch({ type: POST_FETCH_SUCCESS, payload: Object.assign({}, response.data) });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const myPostFetch = ({ token }) => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/myposts`,
    { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        dispatch({ type: MY_POST_FETCH_SUCCESS, payload: Object.assign({}, response.data) });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postSave = ({ title, subtitle, body, id, token }) => {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`,
    {
      title,
      subtitle,
      body
    },
    { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        console.log(response);
        dispatch({ type: POST_SAVE_SUCCESS });
        Actions.myPosts({ type: 'reset' });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postDelete = ({ id, token }) => {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        console.log(response);
        Actions.myPosts({ type: 'reset' });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const resetPostForm = () => {
  return {
    type: POST_FORM_RESET
  };
};
