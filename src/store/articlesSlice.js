/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

// фуникция получения билетов

// const addTicketsArr = createAction("tickets/addTicketsArr");

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  // async function (_, { rejectWithValue }) {
  async function (offset, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();
      // console.log(data);
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
    sortTicketByPrice(state) {},
    // сортировка по скорости
    sortTicketByCheap(state) {},
    // кнопка, выбрать все фильтры
    checkAll(state, action) {},
    // смена галочки на фильтре
    toggleCheck(state, action) {},
    // показать еще 5 карточек
    showMore(state) {},
    addTicketsArr(state, action) {},
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

export const {} = articlesSlice.actions;
export default articlesSlice.reducer;
