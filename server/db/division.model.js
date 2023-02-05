const mongoose = require("mongoose");

const { Schema } = mongoose;

const DivisionSchema = new Schema({
  name: String,
  boss: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  budget: Number,
  location: {
    city: String,
    country: String,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

module.exports = mongoose.model("Division", DivisionSchema);
