import User from "../models/User.js";

export async function getUser(req, res) {
  try {
    // 1. Get the ID from the URL parameter
    const userId = req.params.id;

    // 2. Find the user, explicitly excluding the password hash.
    const user = await User.findById(userId).select("-password");

    if (!user) {
      // Return 404 if the ID is valid but no user is found
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Send the clean public user data
    // We explicitly structure the response to ensure we only send what's necessary
    res.json({
      id: user._id,
      user,
    });
  } catch (error) {
    // This catches errors like invalid MongoDB ObjectId format
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Invalid user ID format" });
    }
    console.error(err.message);
    res.status(500).send("Server Error while fetching profile");
  }
}
