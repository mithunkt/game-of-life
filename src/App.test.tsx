import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders cell container", () => {
  const { container } = render(<App />);
  const cellContainer = container.querySelector(".cell-container");
  expect(cellContainer).toBeDefined();
});

test("renders control buttons", () => {
  const { container } = render(<App />);
  const controls = container.querySelector(".control");
  expect(controls).toBeDefined();
});

test("renders correct number of cells", () => {
  const { container } = render(<App />);
  const cellContainer = container.querySelectorAll(".cell");
  expect(cellContainer.length).toEqual(400);
});
