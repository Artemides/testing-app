import { ChangeEvent, MouseEvent } from "react";
import { Todo } from "@/types/todo";
import { deleteTodo, putTodo } from "@/libs/fetch";

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoItem({ todo, setTodos }: Props) {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTodo = await putTodo(todo);
    setTodos((prevTodos) => [...prevTodos, updatedTodo]);
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    await deleteTodo(todo);
    setTodos((prev) => [...prev.filter((td) => td.id !== todo.id)]);
  };

  return (
    <article className="my-2 flex justify-between items-center">
      <label
        className="text-md hover:font-bold"
        data-testid="todo-item"
        htmlFor={todo.id.toString()}
      >
        {todo.title}
      </label>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id.toString()}
          name="completed"
          onChange={handleChange}
          className="w-4 h-4"
        />

        <button
          data-testid="delete-button"
          onClick={handleDelete}
          className="px-3 py-2 text-md rounded-full max-w-xs bg-stone-800 hover:cursor-pointer hover:bg-red-500"
        >
          🗑️
        </button>
      </div>
    </article>
  );
}
