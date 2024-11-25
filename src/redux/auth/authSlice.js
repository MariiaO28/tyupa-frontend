import { createSlice } from "@reduxjs/toolkit";
import { login, logout, registerNewUser } from "./authoperations";

function handleAuth(state, action) {
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.user.email = action.payload.user.email;
}
const handleRejected = (state, action) => {
  state.isRefreshing = false;
  state.error = action.payload;
};
const handlePending = (state) => {
  state.isRefreshing = true;
  state.error = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
    },
    error: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.fulfilled, handleAuth)
      .addCase(registerNewUser.rejected, handleRejected)
      .addCase(registerNewUser.pending, handlePending)

      .addCase(login.fulfilled, handleAuth)
      .addCase(login.rejected, handleRejected)
      .addCase(login.pending, handlePending)

      .addCase(logout.fulfilled, (state) => {
        state.user = {
          email: null,
        };

        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(logout.pending, handlePending);
  },
});

export const authReducer = authSlice.reducer;
