import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../axios/userAxios.js";

const userSlice = createSlice({
  name: "user_slice",
  initialState: {
    user: {
      username: null,
      status: null,
      otp: null,
      tokenStatus: null,
    },
    data: {},
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    localStorage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(api.registerApi.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.token = null;
    // });
    // builder.addCase(api.registerApi.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    // });
    // builder.addCase(api.registerApi.rejected, (state, action) => {
    //   state.isLoading = true;
    //   state.error = null;
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.token = null;
    // });
    // =========== authenticate ================
    builder.addCase(api.authenticate.pending, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(api.authenticate.fulfilled, (state, action) => {
      // console.log(action.payload, 'from authenticated reducer');
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = true;
      if (action.payload === 200) {
        state.user.status = action.payload;
      } else {
        state.user.status = null;
      }
      // state.user.username = action.meta.arg.username;
    });
    builder.addCase(api.authenticate.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload !== 200) {
        state.error = action.payload;
      }
    });
    // =========== getUserDetails ================
    builder.addCase(api.getUserDetails.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(api.getUserDetails.fulfilled, (state, action) => {
      // console.log(action.payload.data, 'getUserDetails in reducer');
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.data = action.payload.data;
    });
    builder.addCase(api.getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    });

    // =========== login credentials username password token ================

    builder.addCase(api.loginApi.pending, (state, action) => {
      // console.log(action.payload);
      state.isLoading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(api.loginApi.fulfilled, (state, action) => {
      // console.log(action.payload, 'action payload from reducer....');
      state.isLoading = true;
      state.isAuthenticated = true;
      state.user.tokenStatus = action.payload.status;
      if (state.user.tokenStatus === 200) {
        state.localStorage = localStorage.setItem(
          "token",
          JSON.stringify(action.payload)
        );
      }
    });
    builder.addCase(api.loginApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload.message;
    });

    // =========== login credentials username password token ================

    builder.addCase(api.generateOTP.pending, (state) => {
      state.user.otp = null;
      state.user.status = null;
      state.user.username = null;
    });
    builder.addCase(api.generateOTP.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.localStorage = localStorage.setItem(
        "username",
        JSON.stringify(action.payload.data)
      );
    });
    builder.addCase(api.generateOTP.rejected, (state) => {
      state.user.otp = null;
      state.user.status = null;
      state.user.username = null;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
