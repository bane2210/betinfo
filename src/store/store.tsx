import { configureStore } from "@reduxjs/toolkit";
import betinfoSlice from "./createSlice";

const store = configureStore({
  reducer: {
    globalState: betinfoSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
