import Todo, { ITodo } from "../models/todo";
import { Request, Response } from "express";

export const createTodo = async (req: Request, res: Response) => {
  const todo = new Todo<ITodo>(req.body);

  try {
    await todo.save();
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }

  res.status(201).json({
    message: "Todo created successfully",
  });
};

export const getTodos = async (req: Request, res: Response) => {
  const { title } = req.query;
  let query = {};

  if (title) {
    query = {
      $or: [{ title: { $regex: title, $options: "i" } }],
    };
  }

  const todos = await Todo.find<ITodo>(query);

  res.json({
    todos,
  });
};
export const getTodoById = async (req: Request, res: Response) => {
  const todoId = req.params._id;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        message: "The todo does not exist.",
      });
    }

    return res.json({
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  const todoId = req.params._id;

  try {
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({
        message: "The todo does not exist.",
      });
    }

    return res.json({
      message: "Todo was deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const editTodoById = async (req: Request, res: Response) => {
  const todoId = req.params._id;
  const { title, desc, completed } = req.body;
  const updateFields: any = {};

  if (title) updateFields.title = title;
  if (desc) updateFields.description = desc;
  if (completed !== undefined) updateFields.completed = completed;

  try {
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      updateFields,
      { new: true } // Return the modified document
    );

    if (!todo) {
      return res.status(404).json({
        message: "The todo does not exist.",
      });
    }

    return res.json({
      message: "Todo was updated successfully.",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
