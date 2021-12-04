import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Calculator from "./Calculator";

test("Calculator renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Calculator />, div);
});

const clickButton = (name: string) =>
  fireEvent.click(screen.getByRole("button", { name }));

const clickButtons = (names: string[]) =>
  names.forEach((name) => clickButton(name));

const expectOutput = (text: string) =>
  expect(screen.getByRole("status")).toHaveTextContent(text);

test("Pressing 1 twice displays 11", async () => {
  render(<Calculator />);

  clickButtons(["1", "1"]);

  expectOutput("11");
});

test("1+1= displays 2", () => {
  render(<Calculator />);

  clickButtons(["1", "+", "1", "="]);

  expectOutput("2");
});

test(`1+1 without pressing "=" displays 1`, () => {
  render(<Calculator />);

  clickButtons(["1", "+", "1"]);

  expectOutput("1");
});

test(`1+ displays 1`, () => {
  render(<Calculator />);

  clickButtons(["1", "+"]);

  expectOutput("1");
});

test("Pressing 9-5= displays 4", () => {
  render(<Calculator />);

  // Note the minus is a minus symbol not a regular dash.
  // You may need to copy-paste it specifically!
  clickButtons(["9", "−", "5", "="]);

  expectOutput("4");
});
