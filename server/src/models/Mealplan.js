import mongoose from "mongoose";

const mealItemSchema = new mongoose.Schema(
  {
    recipeId: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // prevent auto _id for each item
);

const mealplanSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    meal: {
      breakfast: {
        type: [mealItemSchema],
        default: [],
      },
      lunch: {
        type: [mealItemSchema],
        default: [],
      },
      dinner: {
        type: [mealItemSchema],
        default: [],
      },
      snacks: {
        type: [mealItemSchema],
        default: [],
      },
    },
  },
  { timestamps: true }
);

const Mealplan = mongoose.model("Mealplan", mealplanSchema);
export default Mealplan;
