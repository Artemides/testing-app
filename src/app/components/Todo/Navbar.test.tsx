import { render, screen } from "@testing-library/react";
import Header from "./Header/Header";

describe("Todos Header", () => {
  it(`should render "Todos App" heading`, () => {
    const title = "Todos App";
    render(<Header title={title} />);

    const heading = screen.getByRole("heading", { name: title });

    expect(heading).toBeInTheDocument();
  });

  it(`should render "Edm" heading`, () => {
    const title = "Edm";
    render(<Header title={title} />);

    const heading = screen.getByRole("heading", { name: title });

    expect(heading).toBeInTheDocument();
  });
});
