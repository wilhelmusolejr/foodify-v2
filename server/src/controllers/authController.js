import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, password, gender, bio } = req.body;

    // 1. CHECK FOR EXISTING USER
    const existingUser = await User.findOne({ email: email.toLowerCase() });

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

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists by email
    const user = await User.findOne({ email: email.toLowerCase() });

    // 2. Handle User Not Found
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 3. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    // 4. Handle Incorrect Password
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 5. SUCCESS: Generate JSON Web Token (JWT)
    // The token payload contains the minimum data needed to identify the user (the ID)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_default_secret"
    );

    const userResponse = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: userResponse,
    });
  } catch (error) {
    // 1. Log the full error to the console for server debugging
    console.error("Internal server error during login:", error);

    // 2. Send a generic 500 status response to the client
    // This hides sensitive server details from the user
    res
      .status(500)
      .json({ message: "A technical error occurred. Please try again later." });
  }
}

export async function getUser(req, res) {
  try {
    // authMiddleware runs first and attaches req.user (which contains userId)
    const userId = req.user.userId;

    // Find the user in the database, excluding the sensitive password hash
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // This is the data that hydrates your Zustand store's `user` object
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
