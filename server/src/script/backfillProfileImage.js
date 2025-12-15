// scripts/backfillProfileImages.js
import mongoose from "mongoose";
import User from "../models/User.js"; // adjust path
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

async function backfillProfileImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find users with no profile_image or empty string
    const users = await User.find({
      $or: [{ profile_image: { $exists: false } }, { profile_image: "" }],
    });

    console.log(`Found ${users.length} users to update`);

    for (const user of users) {
      // Let the schema default run:
      if (!user.profile_image) {
        user.profile_image = undefined; // ensure default kicks in if you re-save
      }

      // Or explicitly set using same logic:
      user.profile_image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`;

      await user.save();
      console.log(`Updated user ${user._id}`);
    }

    console.log("Done backfilling profile images.");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error backfilling profile images:", err);
    process.exit(1);
  }
}

backfillProfileImages();
