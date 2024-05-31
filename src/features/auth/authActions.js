import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../api/config";

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
      console.log(response)
      localStorage.setItem("access_token", response.data.data.access_token);
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
      console.log(response)
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
      const response = await fetch(`${BASE_URL}/auth/login/pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          security_pin,
        }),
      });

      // Check if the response is not OK (status code not in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log("pin", data);
      localStorage.setItem("access_token", data.data.access_token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const updatePin = createAsyncThunk(
  "auth/updatePin",
  async (pinData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/auth/update/pin`, pinData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const logOut = createAsyncThunk("auth/logOut", async (pinData, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/auth/logout`, pinData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});