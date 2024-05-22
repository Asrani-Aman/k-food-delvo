import mongoose from 'mongoose';

const DeliveryBoySchema = new mongoose.Schema({
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
  name: {
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

export const DeliveryBoy = mongoose.models.DeliveryBoy || mongoose.model('DeliveryBoy', DeliveryBoySchema);
