import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    recipe_id: {
      type: Number,
    },
  },
  { timestamps: true }
);

// --- Custom Validation (Mandatory for two-field design) ---
// Ensures only ONE of the resource IDs (blog_id or recipe_id) is present.
BookmarkSchema.pre("validate", function (next) {
  // Check if both fields are set
  if (this.blog_id && this.recipe_id) {
    // Validation error: cannot bookmark both resource types
    next(
      new Error("A bookmark cannot reference both a blog post and a recipe.")
    );
  }
  // Check if neither field is set
  else if (!this.blog_id && !this.recipe_id) {
    next(
      new Error("A bookmark must reference either a blog post or a recipe.")
    );
  }
  // Validation successful (exactly one field is set)
  else {
    next();
  }
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
export default Bookmark;
