const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userOrder = new schema({
  email: {
    type: String,
    required: true,
  },
  orders: [
    {
      foodName: {
        type: String,
        required: true,
      },
      foodPrice: {
        type: String,
        required: true,
      },
      foodDescription: {
        type: String,
        required: true,
      },
    },
  ],
  subTotal: {
    type: Number,
    required: true,
  }
});

const USERORDERS = mongoose.model("UserOrder", userOrder);

module.exports = USERORDERS;
