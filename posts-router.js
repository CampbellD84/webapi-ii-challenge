const express = require("express");
const Posts = require("./data/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Posts.findPostComments(req.params.id);
    if (comments) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The comments information could not be retrieved." });
  }
});

router.post("/:id/comments", async (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  try {
    const comment = await Posts.insertComment(commentInfo);
    if (comment.text === "") {
      res.status(400).json({
        errorMessage: "Please provide text for the comment."
      });
    } else {
      res.status(201).json(comment);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messsage: "There was an error while saving the comment to the database"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    if (post.title === "" || post.content === "") {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res.status(201).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messsage: "There was an error while saving the post to the database"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (!post.title || !post.content) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = await Posts.remove(req.params.id);
    if (id) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed." });
  }
});

module.exports = router;
