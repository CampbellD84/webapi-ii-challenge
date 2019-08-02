import React, { useEffect, useState } from "react";
import axios from "axios";

import Posts from "./Posts";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="title-center">
        <h2>Posts</h2>
        <Posts posts={posts} />
      </div>
    </>
  );
}

export default App;
