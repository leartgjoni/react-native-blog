import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import Menu from './Menu';
import Router from './Router';

class Main extends Component {

  onMenuItemSelected = () => {
    this.setState({
      isOpen: false
    });
  }


  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
        <SideMenu
          menu={menu}
          isOpen={this.props.isOpen}>
          <Router />
        </SideMenu>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loggedIn } = auth;

  return { loggedIn };
};

export default connect(mapStateToProps)(Main);
