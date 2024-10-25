import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Element } from "@/interfaces/element.interface.ts";
import { getProfiles } from "@/service/profiles.service.ts";

export const fetchProfiles = createAsyncThunk<Element[]>(
  "elements/fetchProfiles",
  async () => {
    const { data } = await getProfiles();
    return data;
  },
);

interface ElementsState {
  data: Element[];
  isLoading: boolean;
  error: any;
}

const initialState: ElementsState = {
  data: [],
  isLoading: false,
  error: null,
};

const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    readElements: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfiles.pending, (state) => {
      state.data = [];
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProfiles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch profiles";
    });
  },
});

export const { readElements } = elementsSlice.actions;

export default elementsSlice.reducer;
