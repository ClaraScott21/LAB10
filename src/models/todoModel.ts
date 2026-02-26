import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "../../data/todos.json");

export interface Todo {
  id: number;
  name: string;
}

function readTodos(): Todo[] {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

function writeTodos(todos: Todo[]) {
  fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
}

export function getTodos(): Todo[] {
  return readTodos();
}

export function addTodo(name: string) {
  const todos = readTodos();
  const newTodo: Todo = {
    id: Date.now(),
    name
  };
  todos.push(newTodo);
  writeTodos(todos);
}

export function deleteTodo(id: number) {
  const todos = readTodos().filter(todo => todo.id !== id);
  writeTodos(todos);
}