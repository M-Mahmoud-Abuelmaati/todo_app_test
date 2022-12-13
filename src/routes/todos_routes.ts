import express from "express";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  getTodo,
  deleteTodo,
} from "../controllers/todos_controllers";
import { checkAuth } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/todos", checkAuth, getAllTodos);

router.get("/todo/:id", checkAuth, getTodo);

router.post("/", createTodo);

router.put("/todo/:id", checkAuth, updateTodo);

router.delete("/todo/:id", checkAuth, deleteTodo);

export default router;
