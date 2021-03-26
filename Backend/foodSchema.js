const mongoose = require("mongoose");

const schema = mongoose.Schema;

const foodSchema = new schema({
  foodName: { type: String, required: true },
  foodPrice: { type: String, required: true },
  foodDescription: { type: String, required: true }
});

const foodData = mongoose.model("food", foodSchema);

module.exports = foodData;
