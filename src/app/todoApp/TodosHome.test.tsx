import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import TodosHome from "./page";

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
    expect(todoInput).toHaveValue("");
    const todo = await screen.findByText(newTodo);

    expect(todo).toHaveTextContent(newTodo);
  });

  it("updates successfully a todo", async () => {
    render(<TodosHome />);

    const todoCheckBox = screen.getAllByRole("checkbox")[0];
    expect(todoCheckBox).not.toBeChecked();
    await userEvent.click(todoCheckBox);
    expect(todoCheckBox).toBeChecked();
  });

  it("deletes a todo", async () => {
    render(<TodosHome />);

    const todo = screen.getByText("Write Code 💻");
    expect(todo).toBeInTheDocument();

    const deleteBtn = screen.getAllByTestId("delete-button")[0];
    await userEvent.click(deleteBtn);
    expect(todo).not.toBeInTheDocument();
  });
});
