import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    comment_text: {
      type: String,
      required: true,
    },
    recipe_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
