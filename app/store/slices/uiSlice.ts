"use client";

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "dark",
  },
  reducers: {},
});

export default uiSlice.reducer;
