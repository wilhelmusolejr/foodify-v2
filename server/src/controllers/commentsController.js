import Comment from "../models/Comment.js";

export async function getCommentsByRecipeId(req, res) {
  try {
    const { recipeId } = req.params;

    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required." });
    }

    const comments = await Comment.find({ recipe_id: recipeId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("In getting all comments", error);
    res.status(500).json({
      message: "Internall server error",
    });
  }
}

export async function createComment(req, res) {
  try {
    const { user_id, comment_text, recipe_id } = req.body;

    const newComment = new Comment({
      user_id: user_id,
      comment_text: comment_text,
      recipe_id: recipe_id,
    });

    await newComment.save();
    res.status(201).json("Comment sent");
  } catch (error) {
    console.error("In creating comment controller", error);
    res.status(500).json({
      message: "Internall server error",
    });
  }
}
