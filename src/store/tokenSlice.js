// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchToken = createAsyncThunk(
//   "token/fetchToken",
//   async function ({ rejectWithValue, dispatch }) {
//     try {
//       const response = await fetch(
//         "https://conduit.productionready.io/api/users/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user: {
//               email: "ivanvaluchevalex1996@gmail.com",
//               password: "qwertyqwerty12345",
//             },
//           }),
//         }
//       );
//       const data = await response.json();
//       const token = await data.user.token;
//       console.log(token);
//       return token;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const tokenSlice = createSlice({
//   name: "token",
//   initialState: {
//     token: "",
//     status: null,
//     error: null,
//   },

//   reducers: {
//     // сортировка по цене
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchToken.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchToken.fulfilled, (state, action) => {
//         state.status = "resolved";
//         state.token = action.payload;
//       })
//       .addCase(fetchToken.rejected, (state, action) => {
//         state.status = "rejected";
//         state.error = action.payload;
//       });
//   },
// });

// export const { changePage } = tokenSlice.actions;
// export default tokenSlice.reducer;
// // /* eslint-disable no-param-reassign */
// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // export const fetchToken = createAsyncThunk(
// //   "token/fetchToken",
// //   async function ({ rejectWithValue, dispatch }) {
// //     try {
// //       const response = await fetch(
// //         "https://conduit.productionready.io/api/users/login",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             user: {
// //               email: "ivanvaluchevalex1996@gmail.com",
// //               password: "qwertyqwerty12345",
// //             },
// //           }),
// //         }
// //       );
// //       const data = await response.json();
// //       const token = await data.user.token;
// //       console.log(token);
// //       return token;
// //     } catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );

// // const tokenSlice = createSlice({
// //   name: "token",
// //   initialState: {
// //     token: "",
// //     status: null,
// //     error: null,
// //   },

// //   reducers: {
// //     // сортировка по цене
// //   },
// //   extraReducers: {
// //     [fetchToken.pending]: (state) => {
// //       state.status = "loading";
// //       state.error = null;
// //     },
// //     [fetchToken.fulfilled]: (state, action) => {
// //       state.status = "resolved";
// //       state.token = action.payload;
// //     },
// //     [fetchToken.rejected]: (state, action) => {
// //       state.status = "rejected";
// //       state.error = action.payload;
// //     },
// //   },
// // });

// // export const { changePage } = tokenSlice.actions;
// // export default tokenSlice.reducer;
