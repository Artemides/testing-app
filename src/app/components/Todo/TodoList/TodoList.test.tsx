import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

const mockTodos = [
  {
    userId: 1,
    title: "Wave hello! 👋",
    completed: false,
    id: 1,
  },
  {
    userId: 1,
    title: "Get Coffee ☕☕☕",
    completed: false,
    id: 2,
  },
];

const mockSetTodos = jest.fn();

describe("Todo List", () => {
  it('should render "No Todos Available" when there is no todos', () => {
    render(<TodoList todos={[]} setTodos={mockSetTodos} />);

    const message = screen.getByText("No Todos Available");

    expect(message).toBeInTheDocument();
  });

  it("renders the correct number of todos", () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

    const todos = screen.getAllByRole("article");

    expect(todos).toHaveLength(2);
  });

  it("renders the the todos in the correct order", () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

    const todos = screen.getAllByRole("article");
    const firstTodo = todos[0];
    expect(firstTodo).toHaveTextContent("Get Coffee ☕☕☕");
  });
});
