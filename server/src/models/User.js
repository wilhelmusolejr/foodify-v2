import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."], // Better error messaging
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
      unique: true, // Crucial for login/user identification
      trim: true,
      lowercase: true, // Ensure consistent format
    },
    password: {
      // CRUCIAL FIELD for authentication
      type: String,
      required: [true, "Password is required."],
      minlength: 6,
      // select: false // OPTIONAL: Hides password from standard query results
    },
    gender: {
      type: String,
      required: false, // Gender is often optional
      enum: ["Male", "Female", "Other", "Prefer not to say"], // Use enum for limited choices
    },
    bio: {
      type: String,
      required: false, // Bio is rarely required
      maxlength: 500,
    },
    // You might also add:
    // role: { type: String, default: 'user', enum: ['user', 'admin'] },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// IMPORTANT: Export the model using the conventional name.
const User = mongoose.model("User", userSchema);
export default User;
