const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/usermodel");

// update a user
router.put("/user/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (e) {
        return res.status(500).json(e);
      }
    }
    try {
      const user = await User.findByIdAndReplace(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (e) {
      return res.status(500).json(e);
    }
  } else {
    return res.status(403).json("You can only update your account");
  }
});
// delete user
router.delete("/user/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findbyIdAndDelete(req.params.id);
      res.status(200).json("account has been deleted");
    } catch (e) {
      return res.status(500).json(e);
    }
  } else {
    return res.status(403).json("You can only delete your account");
  }
});

// get the user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

// follow a user
router.put("/user/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentuser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentuser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been folowed");
      } else {
        res.status(403).json("you are already followed");
      }
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("you cannot follow yourself");
  }
});

// unfollow a user
router.put("/user/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentuser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentuser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfolowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("you cannot unfollow yourself");
  }
});

module.exports = router;
