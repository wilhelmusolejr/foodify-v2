import Bookmark from "../models/Bookmark.js";

export async function saveBookmark(req, res) {
  try {
    // Get the securely attached userId from the JWT middleware (req.user is set by authMiddleware)
    const userId = req.user.userId;
    const { blogId, recipeId } = req.body;

    // Initial validation based on the two-field design
    if (!blogId && !recipeId) {
      return res
        .status(400)
        .json({ message: "Missing resource ID (blog_id or recipe_id)." });
    }

    // --- Check for existing bookmark based on the provided ID ---
    let resourceId = blogId || recipeId;

    let existingBookmark;
    if (blogId) {
      existingBookmark = await Bookmark.findOne({
        user_id: userId,
        $or: [{ blog_id: resourceId }],
      });
    } else {
      existingBookmark = await Bookmark.findOne({
        user_id: userId,
        $or: [{ recipe_id: resourceId }],
      });
    }

    if (existingBookmark) {
      return res.status(409).json({ message: "Resource already bookmarked." });
    }

    const newBookmark = new Bookmark({
      user_id: userId,
      blog_id: blogId,
      recipe_id: recipeId,
    });

    await newBookmark.save();

    res.status(201).json({
      message: "Bookmark created successfully",
      bookmark: newBookmark,
    });
  } catch (error) {
    console.error("Error creating bookmark:", error.message);

    // Handle Mongoose index violation (unique constraint)
    if (error.code === 11000) {
      return res.status(409).json({ message: "Resource already bookmarked." });
    }
    res.status(500).json({ message: "Server error creating bookmark." });
  }
}

export async function deleteBookmark(req, res) {
  try {
  } catch (error) {}
}

export async function getUserBookmarks(req, res) {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const bookmarks = await Bookmark.find({ user_id: user_id }).lean();

    return res.status(200).json({
      bookmarks,
      count: bookmarks.length,
      success: true,
    });
  } catch (error) {
    console.error(
      `[Error in getUserBookmarks]: Failed to retrieve user bookmarks:`,
      error
    );
    return res.status(500).json({
      error: "An unexpected server error occurred while retrieving bookmarks.",
    });
  }
}

export async function hasUserBookmarked(req, res) {
  try {
    // Get the securely attached userId from the JWT middleware (req.user is set by authMiddleware)
    const userId = req.user.userId;
    const { blogId, recipeId } = req.query;

    let queryCondition = { user_id: userId };
    let resourceType = "";

    if (blogId) {
      queryCondition.blog_id = blogId;
      resourceType = "Blog";
    } else if (recipeId) {
      queryCondition.recipe_id = recipeId;
      resourceType = "Recipe";
    } else {
      return res.status(400).json({
        error:
          "Missing required resource ID (blogId or recipeId) in request body.",
      });
    }

    // Use .lean() for better performance as we only need to check existence
    const existingBookmark = await Bookmark.findOne(queryCondition).lean();

    // 4. Send a success response with a clear boolean status
    const isBookmarked = !!existingBookmark;

    return res.status(200).json({
      isBookmarked,
      message: `User bookmark status for the ${resourceType} resource retrieved successfully.`,
    });
  } catch (error) {
    // 5. Proper error handling: Log the error and return a 500 status
    console.error(
      `[Error in hasUserBookmarked]: Failed to check bookmark status:`,
      error
    );
    return res.status(500).json({
      error:
        "An unexpected server error occurred while checking bookmark status.",
    });
  }
}
