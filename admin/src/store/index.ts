import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/user";
import updateReducer from "./reducers/update";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  update: updateReducer.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
