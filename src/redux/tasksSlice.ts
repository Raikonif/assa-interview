import { createSlice } from "@reduxjs/toolkit";
import { Task } from "@/interfaces/task.interface.ts";

interface TasksState {
  data: Task[];
}

const initialState: TasksState = {
  data: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.data.push(action.payload);
    },
    readTasks: (state, action) => {
      state.data = action.payload;
    },
    updateTask: (state, action) => {
      const { id, status } = action.payload;
      const task: Task | undefined = state.data.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter((task) => task.id !== action.payload);
    },
  },
});

export const { createTask, readTasks, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
