import { rest } from "msw";
import { server } from "../../mocks/server";
import { deleteTodo, fetchTodos, postTodo, putTodo } from "./fetch";
import { Todo } from "@/types/todo";

const mockedTodo: Todo = {
  id: 5,
  completed: false,
  title: "my new todo",
  userId: 1,
};
describe("fetch util function", () => {
  describe("fetch get todos", () => {
    it("returns the correct number of todos", async () => {
      const todos = await fetchTodos();
      expect(todos).toHaveLength(4);
    });

    it("returns an empty array with an error", async () => {
      server.use(
        rest.get("/api/todoapp/todos", (req, res, ctx) => {
          return res(ctx.status(400), ctx.json([]));
        })
      );

      const todos = await fetchTodos();
      expect(todos).toHaveLength(0);
    });
  });

  describe("fetch POST todo", () => {
    it("creates and return the posted todo", async () => {
      const newTodo = await postTodo(mockedTodo.title);
      expect(mockedTodo).toEqual(newTodo);
    });

    it("it responds with 400 and an error when no title is provided", async () => {
      expect.assertions(1);
      try {
        const newTodoTitle = "";
        await postTodo(newTodoTitle);
      } catch (error: any) {
        expect(error.message).toEqual("empty title is not allowed");
      }
    });

    it("fail with a 400 error", async () => {
      server.use(
        rest.post("/api/todoapp/todos", async (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({}));
        })
      );

      expect.assertions(1);
      try {
        const newTodoTitle = "my new todo";
        await postTodo(newTodoTitle);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toEqual("failed to post a new todo");
        }
      }
    });
  });

  describe("fetch PUT todo", () => {
    it("should return the updated TODO", async () => {
      const updatedTodo = await putTodo(mockedTodo);
      expect(updatedTodo).toEqual({ ...mockedTodo, completed: true } as Todo);
    });

    it("fail with a 400 error", async () => {
      server.use(
        rest.put("/api/todoapp/todos/:id", async (req, res, ctx) => {
          return res(ctx.status(400));
        })
      );

      expect.assertions(1);
      try {
        await putTodo(mockedTodo);
      } catch (error) {
        if (error instanceof Error)
          expect(error.message).toEqual("Error updatintg todo");
      }
    });
  });

  describe("fetch DELETE todo", () => {
    it("should return the id of the deleted Todo", async () => {
      const id = await deleteTodo(mockedTodo);
      expect(id).toBe(mockedTodo.id);
    });

    it("should fail with a 400 error code", async () => {
      server.use(
        rest.delete("/api/todoapp/todos/:id", async (req, res, ctx) => {
          return res(ctx.status(400));
        })
      );

      expect.assertions(1);
      try {
        await deleteTodo(mockedTodo);
      } catch (error) {
        if (error instanceof Error)
          expect(error.message).toEqual("Error deleting todo");
      }
    });
  });
});
