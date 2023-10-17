import { RestHandler, rest } from "msw";
import users from "../data/users";
import messages from "../data/messages";

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
];
