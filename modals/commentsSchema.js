const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  comment: String,
});

// model define
const comments = new mongoose.model("comments", commentsSchema);
module.exports = comments;
