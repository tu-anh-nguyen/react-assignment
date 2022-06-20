import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "../constants/toastConstant";
const initialState = [];

const defaultValue = {
  [ToastType.SUCCESS]: {
    title: "Success",
    backgroundColor: "#5CB85C",
  },
  [ToastType.ERROR]: {
    title: "Error",
    backgroundColor: "#D9534F",
  },
  [ToastType.INFO]: {
    title: "Info",
    backgroundColor: "#5BC0DE",
  },
  [ToastType.WARNING]: {
    title: "Warning",
    backgroundColor: "#F0AD4E",
  },
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, { payload }) => {
      const toast = {
        id: state.length + 1,
        title: payload?.title || defaultValue[payload?.type]?.title,
        description: payload?.description || "",
        backgroundColor: defaultValue[payload?.type]?.backgroundColor,
      };
      state.push(toast);
    },

    prepareDisappearToast: (state, { payload: idx }) => {
      const index = state.findIndex(({ id }) => id === idx);
      let st = state;
      st[index] = { ...st[index], pending: true };
      state = st;
    },

    deleteToast: (state, { payload: idx }) => {
      const index = state.findIndex(({ id }) => id === idx);
      state = state.splice(index, 1);
    },
  },
});

export default toastSlice.reducer;
