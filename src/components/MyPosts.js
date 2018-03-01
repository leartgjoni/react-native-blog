import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { myPostFetch } from '../actions';
import MyListItem from './MyListItem';

class MyPosts extends Component {

  componentWillMount() {
    const { token } = this.props;
    this.props.myPostFetch({ token });

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component will be rendered with
    //this.props is still the old set of props.
    this.createDataSource(nextProps);
  }


  createDataSource({ posts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(posts);
  }

  renderRow(post) {
    return <MyListItem post={post} />;
  }

  render() {
    return (
      <ListView
        style={{ paddingTop: 70 }}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts.mine, token: state.auth.token };
};

export default connect(mapStateToProps, { myPostFetch })(MyPosts);
