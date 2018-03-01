import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { postFetch, resetPostForm } from '../actions';
import ListItem from './ListItem';

class PostList extends Component {

  componentWillMount() {
    this.props.resetPostForm();
    this.props.postFetch();

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
    return <ListItem post={post} />;
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
  console.log(state.posts.all);
  return { posts: state.posts.all };
};

export default connect(mapStateToProps, { postFetch, resetPostForm })(PostList);
