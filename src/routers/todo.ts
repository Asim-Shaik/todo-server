import express from "express";
import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  editTodoById,
} from "../controllers/todo";

const router = express.Router();

router.post("/todos", createTodo);

router.get("/todos", getTodos);

router.get("/todos/:_id", getTodoById);

router.delete("/todos/:_id", deleteTodoById);

router.patch("/todos/:_id", editTodoById);

export default router;
