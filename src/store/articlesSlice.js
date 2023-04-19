/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../service/config";
import axios from "axios";

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
      // console.log(data.articles);
      return data.articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchCreateArticle = createAsyncThunk(
  "articles/fetchCreateArticle",
  async (userData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://blog.kata.academy/api/articles`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      return response.data.article;
    } catch (error) {
      throw error;
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
    addArticlesArr(state, action) {
      state.articles = state.articles.concat(action.payload);
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
    [fetchCreateArticle.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCreateArticle.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.articles.push(action.payload);
    },
    [fetchCreateArticle.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { changePage } = articlesSlice.actions;
export default articlesSlice.reducer;
