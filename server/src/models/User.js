import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: 6,
      // select: false // OPTIONAL: Hides password from standard query results
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female", "Other", "Prefer not to say"], // Use enum for limited choices
    },
    bio: {
      type: String,
      required: false,
      maxlength: 500,
    },
    profile_image: {
      type: String,
      required: false,
      trim: true,
      default: function () {
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this._id}`;
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
