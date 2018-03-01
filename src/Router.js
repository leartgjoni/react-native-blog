import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PostList from './components/PostList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
import MyPosts from './components/MyPosts';
import PostView from './components/PostView';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="main">
        <Scene key="postList" component={PostList} title="Blog" initial />
        <Scene key="postView" component={PostView} title="Post" />
        <Scene key="myPosts" component={MyPosts} title="My Posts" />
        <Scene key="postCreate" component={PostCreate} title="Create Post" />
        <Scene key="postEdit" component={PostEdit} title="Edit Post" />
      </Scene>

      <Scene key="loginForm" component={LoginForm} title="Login" />
      <Scene key="registerForm" component={RegisterForm} title="Register" />
    </Router>
  );
};

export default RouterComponent;
