import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import TodoItem from "./TodoItem";

const mockTodo = {
  userId: 1,
  title: "Wave hello! 👋",
  completed: false,
  id: 1,
};

const mockSetTodos = jest.fn();

const setUp = () =>
  render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />);

describe("Todo Item", () => {
  describe("Render Item", () => {
    it("should render an article", () => {
      setUp();

      const article = screen.getByRole("article");

      expect(article).toBeInTheDocument();
    });

    it("should render a label", () => {
      setUp();

      const label = screen.getByTestId("todo-item");

      expect(label).toBeInTheDocument();
    });

    it("should render a checkbox", () => {
      setUp();

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
    });

    it("should render a button", () => {
      setUp();

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("calls setTodos when checkbox is clicked", async () => {
      setUp();

      const checkbox = screen.getByRole("checkbox");
      await userEvent.click(checkbox);

      expect(mockSetTodos).toBeCalled();
    });

    it("calls setTodos when button is clicked", async () => {
      setUp();

      const button = screen.getByTestId("delete-button");

      await userEvent.click(button);
      expect(mockSetTodos).toBeCalled();
    });
  });
});
