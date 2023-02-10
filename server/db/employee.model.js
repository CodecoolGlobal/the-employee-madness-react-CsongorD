// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: Boolean,
  equipment: String,
  salary: Number,
  starting_date: String,
  current_salary: Number,
  favourite_color: String,
  desired_salary: Number,
  division: { type: mongoose.Schema.Types.ObjectId, ref: "Division" },
  kittens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitten",
    },
  ],
  board_game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
