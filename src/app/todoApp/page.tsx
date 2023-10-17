"use client";

import { Todo } from "@/types/todo";
import AddItemForm from "../components/Todo/AddTodo/AddTodo";
import { useState } from "react";
import TodoList from "../components/Todo/TodoList/TodoList";

const INITIAL_TODOS = [
  {
    userId: 1,
    title: "Wave hello! 👋",
    completed: false,
    id: 1,
  },
  {
    userId: 1,
    title: "Get Coffee ☕☕☕",
    completed: false,
    id: 2,
  },
  {
    userId: 1,
    title: "Go to Work ⚒",
    completed: false,
    id: 3,
  },
  {
    userId: 1,
    title: "Write Code 💻",
    completed: false,
    id: 4,
  },
];
const TodosHome = () => {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  return (
    <div className="bg-stone-800 h-screen p-4">
      <AddItemForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default TodosHome;
