import User from "../models/User.js";
import bcrypt from "bcryptjs";

export async function getUser(req, res) {
  try {
    // 1. Get the ID from the URL parameter
    const userId = req.params.id;

    // 2. Find the user, explicitly excluding the password hash.
    const user = await User.findById(userId).select("-password");

    if (!user) {
      // Return 404 if the ID is valid but no user is found
      return res.status(404).json({ message: "User not found", isError: true });
    }

    // 3. Send the clean public user data
    // We explicitly structure the response to ensure we only send what's necessary
    res.json({
      id: user._id,
      user,
    });
  } catch (error) {
    // Mongoose throws a CastError for invalid ObjectId strings
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ message: "Invalid user ID format", isError: true });
    }

    console.error(err.message);
    res.status(500).send("Server Error while fetching profile");
  }
}

export async function updateProfile(req, res) {
  try {
    // 1. get input
    const { firstName, lastName, current_password, new_password, gender, bio } =
      req.body;

    // 2. basic validation: require names + current_password for any profile edit
    if (!firstName || !lastName || !current_password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name and current password are required.",
      });
    }

    // 3. fetch user and include password (in case schema has select: false)
    const user = await User.findById(req.user.userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "Stored password not available for verification.",
      });
    }

    // 4. verify current password
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // 5. if new_password provided -> validate + hash
    if (new_password) {
      if (typeof new_password !== "string" || new_password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters.",
        });
      }
      // hash and set new password
      user.password = await bcrypt.hash(new_password, 10);
    }

    // 6. update other profile fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.gender = gender ?? user.gender;
    user.bio = bio ?? user.bio;

    // 7. save
    await user.save();

    // 8. respond
    return res.json({
      success: true,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
}
