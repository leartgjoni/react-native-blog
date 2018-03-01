import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  nameChanged,
  emailChanged,
  passwordChanged,
  repasswordChanged,
  registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onRePasswordChange(text) {
    this.props.repasswordChanged(text);
  }

  onButtonPress() {
    const { name, email, password, password_confirmation } = this.props;
    this.props.registerUser({ name, email, password, password_confirmation });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <View style={{ paddingTop: 80 }}>
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="John Doe"
              onChangeText={this.onNameChange.bind(this)}
              value={this.props.name}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label="Re-Password"
              placeholder="confirm password"
              onChangeText={this.onRePasswordChange.bind(this)}
              value={this.props.password_confirmation}
            />
          </CardSection>


          <Text style={style.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      </View>
    );
  }
}

const style = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }
};

const mapStateToProps = ({ auth }) => {
  const { name, email, password, password_confirmation, error, loading } = auth;

  return { name, email, password, password_confirmation, error, loading };
};

export default connect(mapStateToProps, {
  nameChanged, emailChanged, passwordChanged, repasswordChanged, registerUser
})(LoginForm);
