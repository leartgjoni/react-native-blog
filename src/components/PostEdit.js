import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { postUpdate, postSave, postDelete, resetPostForm } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class PostEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.post, (value, prop) => {
      this.props.postUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    this.props.resetPostForm();
  }

  onButtonPress() {
    const { title, subtitle, body } = this.props;
    this.props.postSave({ title, subtitle, body, id: this.props.post.id, token: this.props.token });
  }

  onAccept() {
    const { id } = this.props.post;

    this.props.postDelete({ id, token: this.props.token });
  }
  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <View style={{ paddingTop: 80 }}>
        <Card>
          <PostForm />

          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)} >
              Save Changes
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
              Delete Post
            </Button>
          </CardSection>

          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are you sure you want to delete this?
          </Confirm>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { title, subtitle, body } = state.postForm;
  const { token } = state.auth;
  return { title, subtitle, body, token };
};

export default connect(mapStateToProps, { postUpdate, postSave, postDelete, resetPostForm })(PostEdit);
