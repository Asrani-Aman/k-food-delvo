const { default: mongoose } = require("mongoose");

const User = new mongoose.Schema({
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
  username: {
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

export const UserModel = mongoose.models.User || mongoose.model("User", User);


