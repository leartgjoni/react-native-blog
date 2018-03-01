import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostFormReducer from './PostFormReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  auth: AuthReducer,
  postForm: PostFormReducer,
  posts: PostReducer
});
