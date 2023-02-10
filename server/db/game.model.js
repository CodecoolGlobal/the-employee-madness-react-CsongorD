const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
  name: String,
  maxPlayers: Number,
});

module.exports = mongoose.model("Game", GameSchema);
