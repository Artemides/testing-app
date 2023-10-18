import { Todo } from "@/types/todo";

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

  const data = await response.json();
  if (!response.ok) {
    const { error } = data as { error: string };
    if (error) throw Error(error);

    throw Error("failed to post a new todo");
  }

  const newTodo = data as Todo;
  return newTodo;
};

export const putTodo = async (todo: Todo) => {
  const response = await fetch("/api/todoapp/todos/:id", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...todo, completed: !todo.completed }),
  });

  if (!response.ok) {
    throw Error("Error updatintg todo");
  }

  const updatedTodo = await response.json();
  return updatedTodo as Todo;
};

export const deleteTodo = async (todo: Todo) => {
  const response = await fetch(`/api/todoapp/todos/${todo.id}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  if (!response.ok) {
    throw Error("Error deleting todo");
  }
  const { id } = await response.json();
  return id as number;
};
