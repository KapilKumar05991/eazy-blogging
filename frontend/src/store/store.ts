import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blogSlice";
import userReducer from "../features/userSlice"

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user:userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
