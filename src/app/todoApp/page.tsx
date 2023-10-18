"use client";

import { Todo } from "@/types/todo";
import AddItemForm from "../components/Todo/AddTodo/AddTodo";
import { useEffect, useState } from "react";
import TodoList from "../components/Todo/TodoList/TodoList";
import { fetchTodos } from "@/libs/fetch";

const TodosHome = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const getTodos = async () => {
      const _todos = await fetchTodos();
      setTodos(_todos);
    };

    getTodos();
  }, []);
  return (
    <div className="bg-stone-800 h-screen p-4">
      <AddItemForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default TodosHome;
