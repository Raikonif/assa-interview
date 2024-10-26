import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { createTask, readTasks, updateTask } from "@/redux/tasksSlice.ts";
import { Task } from "@/interfaces/task.interface.ts";

describe("tasksSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({ reducer: { tasks: tasksReducer } });
  });

  it("should handle initial state", () => {
    const initialState = { data: [] };
    expect(store.getState().tasks).toEqual(initialState);
  });

  it("should handle readTasks", () => {
    const tasks: Task[] = [
      {
        id: "1",
        name: "Task 1",
        status: false,
        createdAt: "",
      },
    ];
    store.dispatch(readTasks(tasks));
    expect(store.getState().tasks.data).toEqual(tasks);
  });

  it("should handle createTask", () => {
    const newTask: { name: string; id: string; status: boolean } = {
      id: "2",
      name: "Task 2",
      status: false,
    };
    store.dispatch(createTask(newTask));
    expect(store.getState().tasks.data).toContainEqual(newTask);
  });

  it("should handle updateTask", () => {
    const task: { name: string; id: string; status: boolean } = {
      id: "1",
      name: "Task 1",
      status: false,
    };
    store.dispatch(readTasks([task]));
    const updatedTask = { id: "1", status: true }; // Cambia solo el estado
    store.dispatch(updateTask(updatedTask));
    expect(store.getState().tasks.data[0].status).toBe(true);
  });
});
