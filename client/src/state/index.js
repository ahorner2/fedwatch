import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  dateId: "64556d846dc0d5efeb903d03",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
