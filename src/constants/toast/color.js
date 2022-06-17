import ToastType from "./title";

const ToastColor = {
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

export default ToastColor;
