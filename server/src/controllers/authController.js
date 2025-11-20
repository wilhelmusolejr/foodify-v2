import User from "../models/User.js";
import bcrypt from "bcryptjs"; // <-- ADD THIS LINE

export async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, password, gender, bio } = req.body;

    // 1. CHECK FOR EXISTING USER
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // 2. HASH PASSWORD (Security Critical)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. CREATE NEW USER INSTANCE
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      gender,
      bio,
    });

    // 4. SAVE THE USER INSTANCE (Corrected Syntax)
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    // 6. GENERAL ERROR HANDLING
    console.error("Registration error:", error);

    // Check for Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    // Generic Internal Server Error
    res.status(500).json({
      message: "Internal server error during registration.",
    });
  }
}
