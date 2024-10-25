import { configureStore } from "@reduxjs/toolkit";
import elementsReducer from "./elementsSlice";
import tasksReducer from "./tasksSlice";

const store = configureStore({
  reducer: {
    elements: elementsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
