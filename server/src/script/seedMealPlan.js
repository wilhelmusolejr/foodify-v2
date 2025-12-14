import mongoose from "mongoose";
import Mealplan from "../models/Mealplan.js";

import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // make sure env is loaded

async function seedMealplans() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const userId = new mongoose.Types.ObjectId("692fd616bec2b78638c34a02");

    const normalizeDate = (dateStr) => {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const data = [
      {
        user_id: userId,
        date: normalizeDate("2025-12-14"),
        meals: {
          breakfast: [647412],
          lunch: [635215],
          dinner: [],
          snacks: [],
        },
      },
      {
        user_id: userId,
        date: normalizeDate("2025-12-13"),
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [635215],
          snacks: [],
        },
      },
    ];

    // optional: clean old test data
    await Mealplan.deleteMany({
      user_id: userId,
      date: { $in: data.map((d) => d.date) },
    });

    await Mealplan.insertMany(data);

    console.log("✅ Mealplan test data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding mealplans:", error);
    process.exit(1);
  }
}

seedMealplans();
