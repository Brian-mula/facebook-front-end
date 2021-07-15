const express = require("express");
const Post = require("../models/posts");
const User = require("../models/usermodel");

const router = express.Router();

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = newPost.save(savedPost);
    res.status(200);
  } catch (e) {
    res.status(500).json(e);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can only update your post");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been delete");
    } else {
      res.status(403).json("you can only delete your post");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// like a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("this post has been disliked");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
});

// get timeline posts

router.get("/timeline/all", async (req, res) => {
  let postArray = [];
  try {
    const currentuser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentuser._id });

    const friendPosts = await Promise.all(
      currentuser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (e) {
    res.status(500).json(e);
  }
});
