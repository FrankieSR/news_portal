import React, { Component } from 'react';
import Post from './components/Post';
import axios from 'axios';



class App extends Component {

  constructor(){
    super();
  	this.state = {
      data: []
    };
  }


  componentWillMount() {
    axios
      .get('http://5afabec9bc1beb0014c29d20.mockapi.io/posts')
      .then(({ data }) => {
        console.info('SERVAR DATA',data);
    });
  }



  render() {
    return (
      <div>
        {
          !this.state.data.length ? (
            <span>Loading...</span>
        ) : (
          this.state.data.map(({ title , description, image }, key) => (
            <Post
              key = {key}
              title = {title}
              description = {description}
              image = {image}
            />
          ))
        )}
      </div>
    );
  }


}

export default App;
