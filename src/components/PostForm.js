import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { postUpdate } from '../actions';
import { CardSection, Input } from './common';

class PostForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Title"
            placeholder="The best post"
            value={this.props.title}
            onChangeText={value => this.props.postUpdate({ prop: 'title', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Subtitle"
            placeholder="Subtitle for the best post"
            value={this.props.subtitle}
            onChangeText={value => this.props.postUpdate({ prop: 'subtitle', value })}
          />
        </CardSection>

        <CardSection>
        <TextInput
          style={style.textAreaStyle}
          multiline
          numberOfLines={5}
          placeholder="Your post goes here"
          value={this.props.body}
          onChangeText={value => this.props.postUpdate({ prop: 'body', value })}
        />
        </CardSection>
        <Text style={style.errorTextStyle}>
          {this.props.errorForm}
        </Text>
      </View>
    );
  }
}

const style = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    },
    textAreaStyle: {
      flex: 1
    }
};

const mapStateToProps = state => {
  const { title, subtitle, body, errorForm } = state.postForm;

  return { title, subtitle, body, errorForm };
};

export default connect(mapStateToProps, { postUpdate })(PostForm);
