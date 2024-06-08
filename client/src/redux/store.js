import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user_slice";
import { loadState, saveState } from "../utils/sessionStorage";
import { throttle } from "lodash";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
