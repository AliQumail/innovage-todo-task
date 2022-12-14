const express = require("express");
const cors = require("cors");
const Todo = require("./models/todo.model");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/get-todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "There was an error returning the todos." });
  }
});

app.post("/add-todo", async (req, res) => {
  try {
    Todo.create({ todo: req.body.todo });
    res.send({ message: "Todo added!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "There was an error creating the todo." });
  }
});

app.patch("/update-todo", async (req, res) => {
  let todoObj = req.body;
  console.log("todo object : " + todoObj.todo);
  try {
    await Todo.updateOne({ _id: todoObj._id }, todoObj).exec();
    res.send({ message: "Todo updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "There was an error updating the todo." });
  }
});

app.delete("/delete-todo", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.body._id });
    res.send({ message: "Todo deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "There was an error updating the todo." });
  }
});

app.listen(3001, () => {
  console.log("server running at port 3001");
});
