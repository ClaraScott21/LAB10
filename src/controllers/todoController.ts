import { Request, Response } from "express";
import { getTodos, addTodo, deleteTodo } from "../models/todoModel";

export function showTodos(req: Request, res: Response) {
  res.render("list", {
    items: getTodos(),
    username: req.session.username
  });
}

export function createTodo(req: Request, res: Response) {
  const name = req.body.newItem?.trim();
  if (name) addTodo(name);
  res.redirect("/todos");
}

export function removeTodo(req: Request, res: Response) {
  const id = Number(req.body.checkbox);
  if (!Number.isNaN(id)) deleteTodo(id);
  res.redirect("/todos");
}