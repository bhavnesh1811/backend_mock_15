const express = require("express");
const { PostModel } = require("../Models/Post.model");

const PostRouter = express.Router();

PostRouter.post("/add", async (req, res) => {
  try {
    let post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ message: "Post Added Successfully" });
  } catch (error) {
    res
      .status(200)
      .send({ message: "Post Not Added Successfully", error: error.message });
  }
});

PostRouter.get("/", async (req, res) => {
  //   console.log(req);
  const { destination, sortBy, order } = req.query;
  //  console.log(destination,sortBy, order);
  let posts;
  try {
    if (destination && sortBy) {
      if (order === "asc") {
        posts = await PostModel.find({ destination }).sort({ budget_cost: 1 });
      } else {
        posts = await PostModel.find({ destination }).sort({ budget_cost: -1 });
      }
    } else {
      posts = await PostModel.find();
    }

    res.status(200).send({ message: "All Posts", posts: posts });
  } catch (error) {
    res
      .status(200)
      .send({ message: "Error in Getting Posts", error: error.message });
  }
});
PostRouter.get("/search", async (req, res) => {
  const { destination } = req.query;
//   console.log(destination);

  try {
    let posts = await PostModel.find({ destination });

    res.status(200).send({ message: "All Posts", posts: posts });
  } catch (error) {
    res.status(200).send({
      message: "Error in Getting Posts with destination",
      error: error.message,
    });
  }
});
PostRouter.get("/budget", async (req, res) => {
  const { sortBy, order } = req.query;
//   console.log(sortBy);
  let posts;

  try {
    if (order === "asc") {
      posts = await PostModel.find().sort({ budget_cost: 1 });
      // console.log(posts);
    } else {
      posts = await PostModel.find().sort({ budget_cost: -1 });
      // console.log(posts);
    }

    res.status(200).send({ message: "All Posts", posts: posts });
  } catch (error) {
    res.status(200).send({
      message: "Error in Getting Posts with destination",
      error: error.message,
    });
  }
});

module.exports = { PostRouter };
