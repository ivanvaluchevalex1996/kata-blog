// /* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../service/config";
import axios from "axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}users/login`, userData);
      localStorage.setItem("token", response.data.user.token);
      // console.log(response.data);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// instance interceptors.request.use

const initialState = {
  data: null,
  status: "loading",
};
// // realworld-docs.netlify
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
export default authSlice.reducer;
