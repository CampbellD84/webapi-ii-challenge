import React from "react";

const Post = props => {
  return (
    <div className="post-container">
      <h3>{props.post.title}</h3>
      <p>{props.post.contents}</p>
    </div>
  );
};

export default Post;
