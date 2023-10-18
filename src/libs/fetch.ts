import { Todo } from "@/types/todo";
import { todo } from "node:test";

export async function fetchTodos() {
  try {
    const response = await fetch("/api/todoapp/todos");
    const todos = (await response.json()) as Todo[];
    return todos;
  } catch (error) {
    if (error instanceof Error) console.error(error);

    return [];
  }
}

export const postTodo = async (title: string) => {
  const response = await fetch("api/todoapp/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userI: 1,
      title,
      completed: false,
    }),
  });

  if (!response.ok) throw Error("posting a new todo failded");

  return await response.json();
};
