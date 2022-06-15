import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const removedUserSlice = createSlice({
  name: "removedUser",
  initialState,
  reducers: {
    addRemovedUser: (state, { payload }) => {
      state[payload.id] = payload;
    },
  },
});

export default removedUserSlice.reducer;
