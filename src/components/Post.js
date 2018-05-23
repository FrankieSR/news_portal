import React from 'react';

const Post = ({title, description, image}) => {

    return(
      <div className="post" onClick= {() => {console.log(this.length)}}>
        <div style={{ backgroundImage: `url(${ image })` }} className="post__image"></div>
        <div className="post__info">
          <h2 className="post__title">{ title }</h2>
          <a>more ...</a>
          <p className="post__description">
            { description }
          </p>
        </div>
      </div>
    );
}

export default Post;
