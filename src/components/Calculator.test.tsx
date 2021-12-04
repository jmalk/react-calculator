import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Calculator from "./Calculator";

test("Calculator renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Calculator />, div);
});

const clickButton = (name: string) =>
  fireEvent.click(screen.getByRole("button", { name }));

const expectOutput = (text: string) =>
  expect(screen.getByRole("status")).toHaveTextContent(text);

test("Pressing 1 twice displays 11", async () => {
  render(<Calculator />);

  clickButton("1");
  clickButton("1");

  expectOutput("11");
});
