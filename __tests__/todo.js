const todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test suite", () => {
  // Before starting all tests
  beforeAll(() => {
    add({
      title: "Test Item 1",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
  });

  test("Adding a new item", () => {
    const todoLength = all.length;
    add({
      title: "Test Item 2",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(todoLength + 1);
  });

  test("Marking an item as complete", () => {
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });


  test("Overdue items", () => {
    add({
      title: "Test Item 3",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(overdue().length).toBe(1);
  });

  test("Due today items", () => {
    expect(dueToday().length).toBe(2);
  });

  test("Due later items", () => {
    add({
      title: "Test Item 4",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueLater().length).toBe(1);
  });
});