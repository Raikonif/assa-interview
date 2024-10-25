import { configureStore } from "@reduxjs/toolkit";
import elementsReducer from "./elementsSlice";
import tasksReducer from "./tasksSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    elements: elementsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
