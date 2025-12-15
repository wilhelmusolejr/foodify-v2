import mongoose from "mongoose";
import Mealplan from "../models/Mealplan.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

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
      // December 15
      {
        user_id: userId,
        date: normalizeDate("2025-12-15"),
        meal: {
          breakfast: [{ recipeId: 647412 }],
          lunch: [{ recipeId: 635215 }],
          dinner: [],
          snacks: [],
        },
      },

      // December 16
      {
        user_id: userId,
        date: normalizeDate("2025-12-16"),
        meal: {
          breakfast: [],
          lunch: [],
          dinner: [{ recipeId: 635215 }],
          snacks: [],
        },
      },

      // December 18
      {
        user_id: userId,
        date: normalizeDate("2025-12-18"),
        meal: {
          breakfast: [{ recipeId: 525252 }],
          lunch: [],
          dinner: [{ recipeId: 794979 }],
          snacks: [],
        },
      },
    ];

    // Remove existing test data for these dates
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
