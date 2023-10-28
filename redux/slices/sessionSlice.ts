"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SessionInitialState = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  } | null;
  token: string | null;
  loggedIn: boolean;
};

const initialState: SessionInitialState = {
  user: null,
  token: null,
  loggedIn: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    LOGIN: (
      state,
      { payload }: PayloadAction<Partial<SessionInitialState>>
    ) => {
      console.log({ payload });
      state.user = payload.user ?? null;
      state.token = payload.token ?? null;
    },
    Set2FAPass: (state) => {
      state.loggedIn = true;
    },

    LogOut: (state) => {
      state.user = null;
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { LOGIN, Set2FAPass, LogOut } = sessionSlice.actions;
