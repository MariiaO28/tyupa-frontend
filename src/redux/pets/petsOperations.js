import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPetData = createAsyncThunk(
  "pets/fetch",
  async (petId, thunkAPI) => {
    try {
      const response = await axios.get(`/pets/${petId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const isLoggedIn = reduxState.auth.isLoggedIn;
      return isLoggedIn;
    },
  }
);

