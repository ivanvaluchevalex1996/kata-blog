/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../service/config";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  // async function (_, { rejectWithValue }) {
  async function (offset, { rejectWithValue }) {
    try {
      const response = await fetch(
        `${BASE_URL}articles?limit=5&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data.articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: null,
    error: null,
    page: 1,
    totalResults: 1,
  },

  reducers: {
    // сортировка по цене
    changePage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { changePage } = articlesSlice.actions;
export default articlesSlice.reducer;
