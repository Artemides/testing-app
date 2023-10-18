import { postTodo } from "@/libs/fetch";
import { Todo } from "@/types/todo";
import { useState, FormEvent } from "react";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function AddItemForm({ setTodos }: Props) {
  const [item, setItem] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!item) return;

    try {
      const createdTodo = await postTodo(item);
      setTodos((prev) => [...prev, createdTodo]);
      setItem("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-2/5">
      <label hidden htmlFor="title">
        New Todo
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="text-md text-stone-900 p-1 rounded-md flex-grow w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="New Todo"
        autoFocus
      />

      <button
        type="submit"
        className="px-2 py-1 text-md rounded-md text-black font-semibold max-w-xs bg-orange-600 hover:cursor-pointer hover:bg-green-400 disabled:bg-gray-300 enabled:text-white"
        disabled={!item ? true : false}
      >
        Submit
      </button>
    </form>
  );
}
