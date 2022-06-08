import { configureStore } from "@reduxjs/toolkit";
import betinfoReducer from "./createSlice";

export default configureStore({
  reducer: {
    backdropReducer: betinfoReducer,
  },
});
