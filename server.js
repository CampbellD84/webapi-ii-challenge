const express = require("express");
const postsRouter = require("./posts-router");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/posts", postsRouter);

module.exports = server;
