// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  Eq_name: String,
  Eq_type: String,
  Eq_amount: Number,
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
