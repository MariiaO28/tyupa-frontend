import { createSlice } from "@reduxjs/toolkit";
import { fetchPetData, registerNewPet } from "./petsOperations";
import { handlePending, handleRejected } from "../utils";

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
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetData.fulfilled, (state, action) => {
        state.pet = action.payload;
      })
      .addCase(fetchPetData.rejected, handleRejected)
      .addCase(fetchPetData.pending, handlePending)
      .addCase(registerNewPet.fulfilled, (state, action) => {
        state.pet = action.payload;
        state.error = null;
        state.isRefreshing = false;
      })
      .addCase(registerNewPet.rejected, handleRejected)
      .addCase(registerNewPet.pending, handlePending)
  },
});

export const petsReducer = petSlice.reducer;
