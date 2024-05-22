const mongoose = require("mongoose");

const RestaurentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  restaurantName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    length: 10
  },
  address: {
    type: String,
    required: true
  }
});

export const RestaurentModel = mongoose.models.Restorants || mongoose.model("Restorants", RestaurentSchema);
