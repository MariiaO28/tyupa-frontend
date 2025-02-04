import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerNewPet = createAsyncThunk (
  "pets/create",
  async (petData, thunkAPI) => {
    try {
      const response = await axios.post("/pets/", petData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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