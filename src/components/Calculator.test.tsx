import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Calculator from "./Calculator";

test("Calculator renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Calculator />, div);
});

test("Pressing 1 twice displays 11", async () => {
  render(<Calculator />);

  fireEvent.click(screen.getByRole("button", { name: "1" }));
  fireEvent.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status")).toHaveTextContent("11");
});
