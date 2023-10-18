import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import TodosHome from "./page";
import { server } from "../../../mocks/server";
import { rest } from "msw";

describe("Todos Home", () => {
  it("should add a new todo", async () => {
    render(<TodosHome />);

    const newTodo = "new todo";
    const todoInput = screen.getByPlaceholderText("New Todo");
    await userEvent.type(todoInput, newTodo);

    expect(todoInput).toHaveValue(newTodo);

    const submitTodoBtn = screen.getByRole("button", { name: "Submit" });
    expect(submitTodoBtn).toBeEnabled();

    await userEvent.click(submitTodoBtn);
    await waitFor(async () => {
      expect(todoInput).toHaveValue("");
    });

    const todo = await screen.findByText(newTodo);
    expect(todo).toHaveTextContent(newTodo);
  });
  it("shouldn't add a new todo if the request fails", async () => {
    server.use(
      rest.post("/api/todoapp/todos", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ error: "failed to post a new todo" })
        );
      })
    );
    render(<TodosHome />);

    const newTodo = "new todo";
    const todoInput = screen.getByPlaceholderText("New Todo");
    await userEvent.type(todoInput, newTodo);

    expect(todoInput).toHaveValue(newTodo);

    const submitTodoBtn = screen.getByRole("button", { name: "Submit" });
    expect(submitTodoBtn).toBeEnabled();

    await userEvent.click(submitTodoBtn);
    await waitFor(async () => {
      expect(todoInput).toHaveValue(newTodo);
    });

    const todo = screen.queryByText(newTodo);
    expect(todo).not.toBeInTheDocument();
  });

  it("updates successfully a todo", async () => {
    render(<TodosHome />);

    const todoCheckBox = (await screen.findAllByRole("checkbox"))[0];
    expect(todoCheckBox).not.toBeChecked();
    await userEvent.click(todoCheckBox);
    await waitFor(() => {
      expect(todoCheckBox).toBeTruthy();
    });
  });

  it("does not update a todo if request fails", async () => {
    render(<TodosHome />);
    server.use(
      rest.put("/api/todoapp/todos/:id", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({}));
      })
    );

    const todoCheckBox = (await screen.findAllByRole("checkbox"))[0];
    expect(todoCheckBox).not.toBeChecked();
    await userEvent.click(todoCheckBox);
    expect(todoCheckBox).not.toBeChecked();
  });

  it("deletes a todo", async () => {
    render(<TodosHome />);

    const todo = await screen.findByText("Write Code 💻");
    expect(todo).toBeInTheDocument();

    const deleteBtns = await screen.findAllByTestId("delete-button");
    const deleteBtn = deleteBtns[0];
    await userEvent.click(deleteBtn);

    expect(todo).not.toBeInTheDocument();
  });

  it("fails delete a todo if request fails", async () => {
    server.use(
      rest.delete("/api/todoapp/todos/:id", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({}));
      })
    );
    render(<TodosHome />);

    const todo = await screen.findByText("Write Code 💻");
    expect(todo).toBeInTheDocument();

    const deleteBtns = await screen.findAllByTestId("delete-button");
    const deleteBtn = deleteBtns[0];
    await userEvent.click(deleteBtn);
    const todo_ = screen.queryByText("Write Code 💻");

    expect(todo_).toBeInTheDocument();
  });
});
