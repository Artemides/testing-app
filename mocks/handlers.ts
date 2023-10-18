import { RestHandler, rest } from "msw";
import users from "../data/users";
import messages from "../data/messages";
import { todos } from "../data/todos";

const API_URL = "http://localhost:3000/api";
export const handlers: RestHandler[] = [
  rest.get(`${API_URL}/users`, (_req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.get(`${API_URL}/users/:id/messages`, (req, res, ctx) => {
    return res(ctx.json(messages));
  }),
  rest.post(`${API_URL}/users/:id/messages`, async (req, res, ctx) => {
    const { message } = await req.json();
    return res(
      ctx.json({
        id: Math.random(),
        message,
      })
    );
  }),

  //todos

  rest.get(`/api/todoapp/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.post(`/api/todoapp/todos`, async (req, res, ctx) => {
    const { title } = await req.json();
    if (!title) {
      return res(
        ctx.status(400),
        ctx.json({ error: "empty title is not allowed" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ userId: 1, title, completed: false, id: 5 })
    );
  }),

  rest.put(`/api/todoapp/todos/:id`, async (req, res, ctx) => {
    const todo = await req.json();
    return res(ctx.status(200), ctx.json(todo));
  }),

  rest.delete(`/api/todoapp/todos/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.status(200), ctx.json({ id: Number(id) }));
  }),
];
