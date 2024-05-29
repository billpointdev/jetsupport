import { createSlice } from "@reduxjs/toolkit";
import { userLogin, registerUser, validatePin, updatePin } from "./authActions";
import initAxios from "../../api/config";

const userToken = localStorage.getItem("userToken") || null;
const userEmail = localStorage.getItem( "userEmail" ) || null;
const storedUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


const initialState = {
  loading: false,
  userInfo: storedUserInfo,
  userToken: userToken,
  isPinValidated: false,
  error: null,
  success: false,
  userEmail: userEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
      state.userEmail = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("isPinValidated");
       localStorage.removeItem("userInfo"); 
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.data;
      state.userToken = payload.data.access_token;
      state.isPinValidated = true;
      localStorage.setItem("isPinValidated", true);
      localStorage.setItem("userToken", payload.data.access_token);
      localStorage.setItem("userEmail", payload.data.user.email);
        localStorage.setItem("userInfo", JSON.stringify(payload.data));
      initAxios({ token: payload.data.access_token });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.data;
        state.userEmail = payload.data.user.email;
        state.userToken = payload.data.access_token;
        localStorage.setItem("userToken", payload.data.access_token);
        localStorage.setItem( "userEmail", payload.data.user.email );
          localStorage.setItem("userInfo", JSON.stringify(payload.data));
        initAxios({ token: payload.access_token });
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userEmail = payload.data.user.email;
        state.userInfo = payload.data;
        // If the registration API returns a token
        if (payload.data.access_token && payload.data.user.email) {
          state.userToken = payload.data.access_token;
          localStorage.setItem("userToken", payload.data.access_token);
          localStorage.setItem( "userEmail", payload.data.user.email );
            localStorage.setItem("userInfo", JSON.stringify(payload.data));
          initAxios({ token: payload.data.access_token });
        }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(validatePin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validatePin.fulfilled, (state) => {
        state.isPinValidated = true;
        localStorage.setItem("isPinValidated", true);
      })
      .addCase(validatePin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updatePin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePin.fulfilled, (state) => {
        state.isPinValidated = true;
        localStorage.setItem("isPinValidated", true);
      })
      .addCase(updatePin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export const selectAuthToken = (state) => state.auth.userToken;
export const selectUserEmail = (state) => state.auth.userEmail;

export default authSlice.reducer;
