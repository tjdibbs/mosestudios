"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./slices/sessionSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  session: sessionSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
