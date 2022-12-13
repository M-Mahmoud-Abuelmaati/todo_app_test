import Todos from "../models/todos";
import mongoose from "mongoose";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const getAllTodos = async (req: Request, res: Response) => {
  const todos = await Todos.find();
  res.status(200).json(todos);
};

const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const todo = await Todos.findOne({ _id: id });
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

const createTodo = (req: Request, res: Response) => {
  const { name, body } = req.body;
  if (!name || !body) {
    return res.status(400).json("Please enter a name and body");
  }
  Todos.create({ name, body }).then((todo) => {
    const token = jwt.sign({ id: todo.id }, jwtSecret!, { expiresIn: "3d" });
    return res.status(201).json({
      message: "Todo created successfully",
      token: token,
    });
  });
};

const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, body } = req.body;
  if (name.length <= 0 || body.length <= 0) {
    res.status(404).json({ message: "You must provide an item name and boy" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  Todos.updateOne({ _id: id }, { name, body }).then(() =>
    res.status(200).json({
      message: "Todo updated successfully",
      name,
      body,
    })
  );
};

const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Todo not found" });
  }
  Todos.deleteOne({ _id: id }).then(() =>
    res.status(200).json({
      message: "Todo deleted successfully",
      name: "",
      body: "",
    })
  );
};

export { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
