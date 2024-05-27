import { createAsyncThunk } from '@reduxjs/toolkit';


const BASE_URL = import.meta.env.VITE_APP_BASE_URL;



// Async thunk for user login
export const userLogin = createAsyncThunk(
  '/auth/login',
  async (userCredentials, { rejectWithValue }) => {
    try {
      // Mocked fetch
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to login');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (userDetails, { rejectWithValue }) => {
    try {
         const response = await fetch(`${BASE_URL}/auth/register`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(userDetails),
         });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to register");
      }
      const data = await response.json();
      
      console.log("data" , data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
