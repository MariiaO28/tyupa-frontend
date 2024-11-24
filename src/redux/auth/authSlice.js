import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, login, logout, registerNewUser } from "./operations";

function handleAuth(state, action) {
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.user.name = action.payload.user.name;
  state.user.email = action.payload.user.email;
}
const handleRejected = (state, action) => {
  state.isRefreshing = false;
  state.error = action.payload;
};
const handlePending = (state) => {
  state.isRefreshing = true;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      password: null,
    },
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
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(logout.pending, handlePending)

      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isRefreshing = false;
      })
      .addCase(fetchUserData.rejected, handleRejected)
      .addCase(fetchUserData.pending, handlePending);
  },
});

export const authReducer = authSlice.reducer;
