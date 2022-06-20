import { createdUserSlice } from "../slices/createdUserSlice";
import { editedUserSlice } from "../slices/editedUserSlice";
import { removedUserSlice } from "../slices/removedUserSlice";
import { toastSlice } from "../slices/toastSlice";

export const { addEditedUser } = editedUserSlice.actions;
export const { addCreatedUser } = createdUserSlice.actions;
export const { addRemovedUser } = removedUserSlice.actions;
export const { addToast, prepareDisappearToast, deleteToast } =
  toastSlice.actions;
