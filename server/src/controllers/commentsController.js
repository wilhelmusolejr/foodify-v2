import Comment from "../models/Comment.js";

export async function getCommentsByRecipeId(req, res) {
  try {
    const { recipeId } = req.params;

    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required." });
    }

    const comments = await Comment.find({ recipe_id: recipeId })
      .populate({
        path: "user_id",
        select: "firstName lastName profile_image",
      })
      .sort({ createdAt: -1 }); // Show newest comments first

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
    // 1. Get the securely attached userId from the JWT middleware (req.user is set by authMiddleware)
    const userId = req.user.userId;

    // 2. Get non-user-specific data from the request body
    const { comment_text, recipe_id } = req.body;

    // Basic validation
    if (!comment_text || !recipe_id) {
      return res
        .status(400)
        .json({ message: "Missing comment text or recipe ID." });
    }

    // 3. Create the comment instance
    const newComment = new Comment({
      user_id: userId, // Use the verified ID from the token
      comment_text: comment_text,
      recipe_id: recipe_id,
    });

    // 4. Save the comment to the database
    await newComment.save();

    // 5. Populate the 'user_id' field to get the actual user document.
    // This replaces the ObjectId with the User object, excluding the password.
    const savedComment = await newComment.populate({
      path: "user_id",
      select: "firstName lastName profile_image email ",
    });

    // 6. Return the fully populated comment to the frontend for UI update
    // The frontend now receives the complete comment object, where 'user_id'
    // is a full user object instead of just an ID.
    res.status(201).json({
      message: "Comment created successfully",
      comment: savedComment,
    });
  } catch (error) {
    // 7. Handle validation and server errors
    console.error("Comment creation failed:", error);
    // Check for Mongoose validation errors
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid data provided for the comment.",
        details: error.message,
      });
    }
    res
      .status(500)
      .json({ message: "Server error during comment submission." });
  }
}

export async function getUserComments(req, res) {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const comments = await Comment.find({ user_id: user_id }).lean();

    return res.status(200).json({
      comments,
      count: comments.length,
      success: true,
    });
  } catch (error) {
    console.error(`[Error in getUserComments]: `, error);
    return res.status(500).json({
      error: "An unexpected server error occurred while retrieving comments.",
    });
  }
}
