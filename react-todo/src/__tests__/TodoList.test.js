import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

// Test Initial Rendering
test("renders TodoList with initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Todo List")).toBeInTheDocument();
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Write Tests")).toBeInTheDocument();
});

// Test Adding a Todo
test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add a new task");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

// Test Toggling a Todo
test("toggles a todo item", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: none");
});

// Test Deleting a Todo
test("deletes a todo item", () => {
  render(<TodoList />);
  const deleteButton = screen.getAllByText("Delete")[0];
  const todoItem = screen.getByText("Learn React");

  fireEvent.click(deleteButton);

  expect(todoItem).not.toBeInTheDocument();
});
