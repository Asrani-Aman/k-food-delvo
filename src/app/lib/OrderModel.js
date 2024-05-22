import { DeliveryBoy } from "./DeliveryBoyModel";
import { RestaurentModel } from "./RestaurentModel";
import { UserModel } from "./UserModel";

const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: UserModel
  },
  foodItemIdsWithQuantity: [
    {
      type: {
        id: {
          type: String,
          required: true
        },
        quantity: {
          type: String,
          required: true
        }
      },
      required: true
    }
  ],
  restoId: {
    type: mongoose.Types.ObjectId,
    ref: RestaurentModel
  },
  deliveryBoyId: {
    type: mongoose.Types.ObjectId,
    ref: DeliveryBoy
  },
  status: {
    type: String,
    required: true,
    default: "JustOrdered",
    enum: ["JustOrdered", "Cancelled", "Delivered", "On The Way"]
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  }
});

export const OrderModel = mongoose.models.OrderSchema || mongoose.model("OrderSchema", OrderSchema);


