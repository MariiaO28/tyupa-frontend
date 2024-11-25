import { createSlice } from "@reduxjs/toolkit";

const petSlice = createSlice({
    name: "pet",
    initialState: {
      pet: {
        name: null,
        birthday: null,
        phone: null,
        gender: null,
        breed: null,
        color: null,
        telegram: null,
        owner: null,
      },
      error: null,
    //   token: null,
    //   isLoggedIn: false,
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
  
  export const authReducer = petSlice.reducer;
  