import { createAsyncThunk } from '@reduxjs/toolkit';

// Mocking API responses
const mockLoginResponse = {
  userToken: 'mockToken123',
  userInfo: {
    id: 1,
    name: 'Mock User',
    email: 'mockuser@example.com',
  },
};

const mockRegisterResponse = {
  message: 'Registration successful',
};

// Async thunk for user login
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (userCredentials, { rejectWithValue }) => {
    try {
      // Mocked fetch
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => mockLoginResponse,
          });
        }, 1000);
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
  'auth/registerUser',
  async (userDetails, { rejectWithValue }) => {
    try {
      // Mocked fetch
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => mockRegisterResponse,
          });
        }, 1000);
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to register');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
