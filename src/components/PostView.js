import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection } from './common';

class PostView extends Component {
  render() {
    return (
      <View style={{ paddingTop: 70 }}>
        <Card>
          <CardSection>
            <Text>
              {this.props.post.title}
            </Text>
          </CardSection>

          <CardSection>
            <Text>
              {this.props.post.subtitle}
            </Text>
          </CardSection>

          <CardSection>
            <Text>
              {this.props.post.body}
            </Text>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default PostView;
