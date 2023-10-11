import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "@/app/page";

describe("Home", () => {
  it("should have Docs Text ", () => {
    //ARRENGE
    render(<Home />);

    //ACT
    const elem = screen.getByText("Docs");

    //ASSERT
    expect(elem).toBeInTheDocument();
  });

  it("should should contain the text information ", () => {
    //ARRENGE
    render(<Home />);

    //ACT
    const elem = screen.getByText(/information/i);

    //ASSERT
    expect(elem).toBeInTheDocument();
  });

  it("does not contain heading of level 1", () => {
    render(<Home />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings.length).toBe(0);
  });
});
