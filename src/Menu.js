import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { logoutUser } from './actions';


const window = Dimensions.get('window');
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 0,
    fontSize: 25,
  },
  item: {
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {
  static propTypes = {
   onItemSelected: React.PropTypes.func.isRequired,
 };

 renderBasedOnAuth() {
   if (this.props.loggedIn) {
     return this.renderLoggedIn();
   }
   return this.renderLoggedOut();
 }

 renderLoggedIn() {
   return (
     <ScrollView scrollsToTop={false} style={styles.menu}>
       <View style={styles.avatarContainer}>
         <Image
                style={styles.avatar}
                source={{ uri: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png' }}/>
          <Text style={styles.name}>{this.props.user.name}</Text>
       </View>

       <Text
         onPress={() => {
           Actions.postList();
           this.props.onItemSelected();
         }}
         style={styles.item}>
         Home
       </Text>

       <Text
         onPress={() => {
           Actions.postCreate();
           this.props.onItemSelected();
         }}
         style={styles.item}>
         New Post
       </Text>

       <Text
         onPress={() => {
           Actions.myPosts();
           this.props.onItemSelected();
         }}
         style={styles.item}>
         My Posts
       </Text>

       <Text
         onPress={() => {
           this.props.logoutUser();
         }}
         style={styles.item}>
         Logout
       </Text>
     </ScrollView>
   );
 }
 renderLoggedOut() {
   return (
     <ScrollView scrollsToTop={false} style={styles.menu}>
       <View style={styles.avatarContainer}>
       <Text style={styles.name}>Menu</Text>
       </View>

       <Text
         onPress={() => {
           Actions.postList();
           this.props.onItemSelected();
         }}
         style={styles.item}>
         Home
       </Text>

       <Text
         onPress={() => {
           Actions.loginForm();
           this.props.onItemSelected();
         }}
         style={styles.item}>
         Login
       </Text>

       <Text
         onPress={() => {
           Actions.registerForm();
           this.props.onItemSelected();
         }}
         style={styles.item}>
         Register
       </Text>
     </ScrollView>
   );
 }
  render() {
    return this.renderBasedOnAuth();
  }
}

const mapStateToProps = ({ auth }) => {
  const { loggedIn, user } = auth;

  return { loggedIn, user };
};

export default connect(mapStateToProps, { logoutUser })(Menu);
