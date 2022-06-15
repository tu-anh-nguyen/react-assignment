import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const editedUserSlice = createSlice({
  name: "editedUser",
  initialState,
  reducers: {
    addEditedUser: (state, { payload }) => {
      state[payload.id] = payload;
    },
  },
});

export default editedUserSlice.reducer;
