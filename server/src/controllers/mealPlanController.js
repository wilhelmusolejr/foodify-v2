import Mealplan from "../models/Mealplan.js";

/**
 * GET /api/meals/week?date=YYYY-MM-DD
 */
export async function getUserMeal(req, res) {
  try {
    const userId = req.user.userId;
    const { date } = req.query;

    const baseDate = date ? new Date(date) : new Date();
    baseDate.setHours(0, 0, 0, 0);

    // ===== 1. Get Monday of the week =====
    const jsDay = baseDate.getDay(); // 0 (Sun) -> 6 (Sat)
    const offset = (jsDay + 6) % 7; // Monday start
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - offset);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    // ===== 2. Fetch all mealplans for the week =====
    const mealplans = await Mealplan.find({
      user_id: userId,
      date: {
        $gte: monday,
        $lte: sunday,
      },
    }).lean();

    // Map mealplans by YYYY-MM-DD
    const mealMap = new Map();
    for (const plan of mealplans) {
      const iso = toLocalISO(plan.date);
      mealMap.set(iso, plan.meal);
    }

    // ===== 3. Build week schedule =====
    const schedule = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      const iso = toLocalISO(d);

      return {
        date: d.toLocaleString("en-US", { month: "long", day: "numeric" }),
        iso,
        short: d.toLocaleString("en-US", { weekday: "short", day: "numeric" }),
        day_type: d.toLocaleString("en-US", { weekday: "long" }).toLowerCase(),
        meal: mealMap.get(iso) || {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        },
      };
    });

    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    console.error("getUserMeal error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user meals",
    });
  }
}

export async function addUserMeal(req, res) {
  try {
    const userId = req.user.userId;
    const { date, mealTimes, recipeId } = req.body;

    // date = 2025-12-20
    // mealTimes = ["lunch"]
    // recipeId = 782601

    if (!date || !mealTimes?.length || !recipeId) {
      return res.status(400).json({
        success: false,
        message: "Missing date, mealTimes, or recipeId",
      });
    }

    const mealDate = new Date(date);
    mealDate.setHours(0, 0, 0, 0);

    // Find or create mealplan
    let mealplan = await Mealplan.findOne({
      user_id: userId,
      date: mealDate,
    });

    if (!mealplan) {
      mealplan = new Mealplan({
        user_id: userId,
        date: mealDate,
      });
    }

    // Add recipe to each selected meal time
    for (const mealTime of mealTimes) {
      if (!mealplan.meal[mealTime]) continue;

      const alreadyExists = mealplan.meal[mealTime].some(
        (item) => item.recipeId === recipeId
      );

      if (!alreadyExists) {
        mealplan.meal[mealTime].push({ recipeId });
      }
    }

    await mealplan.save();

    return res.status(200).json({
      success: true,
      data: mealplan,
    });
  } catch (error) {
    console.error("addUserMeal error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add meal",
    });
  }
}

export async function deleteUserMeal(req, res) {
  try {
    const userId = req.user.userId;
    const { date, items } = req.body;

    if (!date || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Date and items are required",
      });
    }

    // Normalize date
    const mealDate = new Date(date);
    mealDate.setHours(0, 0, 0, 0);

    // Find mealplan
    const mealplan = await Mealplan.findOne({
      user_id: userId,
      date: mealDate,
    });

    if (!mealplan) {
      return res.status(404).json({
        success: false,
        message: "Mealplan not found",
      });
    }

    // Remove items
    for (const { recipeId, mealTime } of items) {
      if (!mealplan.meal[mealTime]) continue;

      mealplan.meal[mealTime] = mealplan.meal[mealTime].filter(
        (item) => item.recipeId !== recipeId
      );
    }

    await mealplan.save();

    return res.status(200).json({
      success: true,
      message: "Meals removed successfully",
      data: mealplan,
    });
  } catch (error) {
    console.error("deleteUserMeal error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete meals",
    });
  }
}

function toLocalISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}
