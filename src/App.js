import React, { Component } from "react";
import Post from "./components/Post";
import axios from "axios";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  fetchPosts() {
    const { setPosts } = this.props;
    setPosts(['loading']);
    axios
      .get("http://5afabec9bc1beb0014c29d20.mockapi.io/posts")
      .then(({ data }) => {
        setPosts(data);
      });
  }

  render() {
    console.log('this --->' , this.props.region.region);
    const { posts } = this.props;
    const { items } = posts;
    return (
      <div>
        <div>
          <button onClick={this.fetchPosts.bind(this)}>Load posts</button>
          <h3>Region: {this.props.region.region}</h3>
          <ul>
            <li>
              <button onClick={() => this.props.changeRegion("ZP")}>ZP</button>
            </li>
            <li>
              <button onClick={() => this.props.changeRegion("KW")}>KW</button>
            </li>
            <li>
              <button onClick={() => this.props.changeRegion("ODS")}>
                ODS
              </button>
            </li>
          </ul>
        </div>
        {!items.length ? (
          <span>Loading ...</span>
        ) : (
          items.map(({ title, description, image }, key) => (
            <Post
              key={key}
              title={title}
              description={description}
              image={image}
            />
          ))
        )}
      </div>
    );
  }
}

const state = props => {
  return {
    loading: true,
    ...props
  };
};

const actions = dispatch => ({
  setPosts: data =>
    dispatch({
      type: "SET_POSTS",
      payload: data
    }),
  changeRegion: name =>
    dispatch({
      type: "CHANGE_REGION",
      payload: name
    })
});

export default connect(state, actions)(App);
