import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "../features/file/fileSlice";

export const store = configureStore({
  reducer: {
    files: fileReducer,
  },
});
