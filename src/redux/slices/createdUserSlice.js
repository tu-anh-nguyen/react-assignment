import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousId: 100,
};

export const createdUserSlice = createSlice({
  name: "createdUser",
  initialState,
  reducers: {
    addCreatedUser: (state, { payload }) => {
      const id = state.previousId + 1;
      state[state.previousId + 1] = { ...payload, id };
    }, 
  },
});

export default createdUserSlice.reducer;
