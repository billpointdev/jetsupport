import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const userLogin = createAsyncThunk(
  "auth/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        userCredentials
      );
      if (!response.data) {
        throw new Error("Failed to login");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        userDetails
      );
      if (!response.data) {
        throw new Error("Failed to register");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const validatePin = createAsyncThunk(
  "auth/validatePin",
  async ({ email, security_pin }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login/pin", {
        email,
        security_pin,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const updatePin = createAsyncThunk(
  "auth/updatePin",
  async (pinData, thunkAPI) => {
    try {
      const response = await axios.post(`/auth/update/pin`, pinData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
