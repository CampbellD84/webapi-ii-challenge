import React from "react";

import Post from "./Post";

const Posts = props => {
  return (
    <div className="posts-container">
      {props.posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
