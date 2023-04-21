/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../service/config";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async function (offset) {
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
      throw error;
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
export const fetchDeleteArticle = createAsyncThunk(
  "articles/fetchDeleteArticle",
  async (slug) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://blog.kata.academy/api/articles/${slug}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
      // return response.data.article;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchEditArticle = createAsyncThunk(
  "articles/fetchEditArticle",
  async (payload) => {
    const { slug, userData } = payload;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://blog.kata.academy/api/articles/${slug}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchLikeArticle = createAsyncThunk(
  "articles/fetchLikeArticle",
  async (slug) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}articles/${slug}/favorite`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
      return response.data.article;
    } catch (error) {
      console.log(error);
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
    like: false,
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
    [fetchEditArticle.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchEditArticle.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.articles.push(action.payload.article);
    },
    [fetchEditArticle.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [fetchLikeArticle.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.slug ? action.payload : article
      );
      // state.likes = true;
      console.log(action.payload);
      console.log(action);
    },
    // [fetchLikeArticle.rejected]: (state, action) => {
    //   state.status = "rejected";
    //   state.error = action.payload;
    // },
  },
});

export const { changePage } = articlesSlice.actions;
export default articlesSlice.reducer;
