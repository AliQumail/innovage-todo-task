const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
  todo: { type: String, required: true}
});

const model = mongoose.model("todoData",  Todo);

module.exports = model;