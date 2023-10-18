import { rest } from "msw";
import { server } from "../../mocks/server";
import { fetchTodos } from "./fetch";

describe("fetch util function", () => {
  describe("fetch get todos", () => {
    it("returns the correct number of todos", async () => {
      const todos = await fetchTodos();
      expect(todos).toHaveLength(4);
    });

    it("returns an empty array with an error", async () => {
      server.use(
        rest.get("/api/todoapp/todos", (req, res, ctx) => {
          return res(ctx.status(400));
        })
      );

      const todos = await fetchTodos();
      expect(todos).toHaveLength(0);
    });
  });

  describe("fetch POST todo", () => {
    it("creates correctly a new todo", async () => {});
  });
});
