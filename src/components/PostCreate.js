import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { postUpdate, postCreate, resetPostForm } from '../actions';
import { Card, CardSection, Button } from './common';
import PostForm from './PostForm';

class PostCreate extends Component {

  componentWillUnmount() {
    this.props.resetPostForm();
  }

  onButtonPress() {
    const { title, subtitle, body, token } = this.props;

    this.props.postCreate({ token, title, subtitle, body });
  }

  render() {
    return (
      <View style={{ paddingTop: 80 }}>
        <Card>
          <PostForm {...this.props} />
          <CardSection>
            <Button
              onPress={this.onButtonPress.bind(this)}
            >
              Create
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { title, subtitle, body } = state.postForm;
  const { token } = state.auth;

  return { title, subtitle, body, token };
};

export default connect(mapStateToProps, {
  postUpdate, postCreate, resetPostForm
})(PostCreate);
