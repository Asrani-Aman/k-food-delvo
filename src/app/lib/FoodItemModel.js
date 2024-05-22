import { RestaurentModel } from "./RestaurentModel";

const { default: mongoose } = require("mongoose");

const FoodItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  restoId: {
    type: mongoose.Types.ObjectId,
    ref: RestaurentModel
  }
});

export const FoodItemModel = mongoose.models.FoodItemModel || mongoose.model("FoodItemModel", FoodItem);


