import React from "react";
import { render, screen } from "@testing-library/react";
import ReviewApp from "./ReviewApp";

test("renders learn react link", () => {
  render(<ReviewApp />);
  const linkElement = screen.getByText(/Review/i);
  expect(linkElement).toBeInTheDocument();
});
