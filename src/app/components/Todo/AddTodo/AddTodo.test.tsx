import { render, screen } from "@testing-library/react";
import AddItemForm from "./AddTodo";
import { userEvent } from "@testing-library/user-event";
const mockSetTodos = jest.fn();

describe("Add Todo", () => {
  describe("render", () => {
    it("renders an input text", () => {
      render(<AddItemForm setTodos={mockSetTodos} />);

      const input = screen.getByPlaceholderText("New Todo");

      expect(input).toBeInTheDocument();
    });

    it("should render a disabled button", () => {
      render(<AddItemForm setTodos={mockSetTodos} />);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  describe("behavior", () => {
    it("should be able to add text to the input", async () => {
      render(<AddItemForm setTodos={mockSetTodos} />);

      const typedText = "new todo";
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, typedText);

      expect(input).toHaveValue(typedText);
      ("");
    });

    it("should enable to submit a new todo when input gets filled", async () => {
      render(<AddItemForm setTodos={mockSetTodos} />);

      const typedText = "new todo";
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, typedText);
      const button = screen.getByRole("button");

      expect(button).toBeEnabled();
    });

    it("should empty the text input when submitted", async () => {
      render(<AddItemForm setTodos={mockSetTodos} />);

      const typedText = "new todo";
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, typedText);
      const button = screen.getByRole("button");
      await userEvent.click(button);

      expect(input).toHaveValue("");
    });

    it("should call setTodos when submitted", async () => {
      render(<AddItemForm setTodos={mockSetTodos} />);

      const typedText = "new todo";
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, typedText);
      const button = screen.getByRole("button", { name: "Submit" });
      await userEvent.click(button);

      expect(mockSetTodos).toBeCalled();
    });
  });
});
