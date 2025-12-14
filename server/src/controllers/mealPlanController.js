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
      mealMap.set(iso, plan.meals);
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

function toLocalISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}
