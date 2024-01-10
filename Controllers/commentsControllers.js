const comments = require("../modals/commentsSchema");
const users = require("../modals/userSchema");

// create Product
exports.commentpost = async (req, res) => {
  try {
    // Assume you have a 'userId' and 'comment' in the request body
    const { userId, comment } = req.body;

    // Check if the user exists
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new comment
    const newComment = new comments({
      userId,
      comment,
      user_id: req.user.id,
    });

    // Save the comment to the database
    await newComment.save();

    const userData = await users.findById(userId);

    res.status(201).json({
      _id: newComment._id,
      userId: newComment.userId,
      comment: newComment.comment,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.commentget = async (req, res) => {
  try {
    const comment = await comments.find({ user_id: req.user.id });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.singleCommentGet = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await comments.find({ _id: id, user_id: req.user.id });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
