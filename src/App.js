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
    setPosts(["loading"]);
    axios
      .get("https://5afabec9bc1beb0014c29d20.mockapi.io/post")
      .then(({ data }) => {
        setPosts(data);
      });
  }

  fetchPosts2() {
    const { setPosts } = this.props;
    setPosts(["loading"]);
    axios
      .get("https://5afabec9bc1beb0014c29d20.mockapi.io/post2")
      .then(({ data }) => {
        setPosts(data);
      });
  }




  render() {

    const { posts } = this.props;
    const { items } = posts;

    console.log(items + "<===================");
    return (
      <div>
        <div>
          <h3>Region: {this.props.region.region}</h3>
          <button onClick={this.fetchPosts.bind(this)}>получить</button>
          <button onClick={this.fetchPosts2.bind(this)}>получить 2</button>
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
          items.map(({ title, text, image }, key) => (
            <Post key={key} title={title} description={text} image={image} />
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
