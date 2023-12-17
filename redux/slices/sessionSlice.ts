"use client";

import Affiliate from "@models/affiliateModel";
import User from "@models/userModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SessionInitialState = {
  user: User<Affiliate> | null;
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
      state.user = {
        ...payload.user!,
        fullName: function (this: User) {
          return this.firstName + " " + this.lastName;
        },
      };
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
    AddBank: (state, actions: PayloadAction<Affiliate["banks"][0]>) => {
      state.user = {
        ...state.user!,
        affiliate: {
          ...state.user!.affiliate,
          banks: [actions.payload, ...state.user!.affiliate.banks],
        },
      };
    },
  },
});

export const { LOGIN, Set2FAPass, LogOut, AddBank } = sessionSlice.actions;
