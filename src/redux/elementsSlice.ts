import { createSlice } from "@reduxjs/toolkit";
import { Element } from "@/interfaces/element.interface.ts";

interface ElementsState {
  data: Element[];
}

const initialState: ElementsState = {
  data: [],
};

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    readElements: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { readElements } = elementsSlice.actions;

export default elementsSlice.reducer;
