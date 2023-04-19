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
      console.log(response.data);
      localStorage.setItem("data", JSON.stringify(response.data));
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}users`, userData);
      localStorage.setItem("token", response.data.user.token);
      console.log(response.data);
      localStorage.setItem("data", JSON.stringify(response.data));
      console.log(response);
      return response.data;
    } catch (e) {
      throw new Error("request error");
    }
  }
);

export const fetchEditData = createAsyncThunk(
  "auth/fetchRegister",
  async (userData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    // в этом запросе при перезагрузке страницы токен обновлялся поэтому выбрасывало из учетки
    // localStorage.setItem("token", JSON.stringify(data.user.token));
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("image", JSON.stringify(data.user.image));
    return data;
  }
);

// при перезагрузке страницы, чтобы не выбрасывало
export const initAuth = createAsyncThunk("auth/initAuth", async () => {
  const token = localStorage.getItem("token");
  // console.log(token);
  if (token) {
    const response = await axios.get(`${BASE_URL}user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    localStorage.setItem("data", JSON.stringify(response.data));
    return response.data;
  } else {
    return null;
  }
});

const initialState = {
  data: null,
  status: "loading",
  error: null,
};
// // realworld-docs.netlify
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.data = null;
    },
    login: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("data", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.user.token);
      console.log(action.payload);
    },
    edit: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("data", JSON.stringify(action.payload));
      localStorage.setItem("image", JSON.stringify(action.payload.user.image));
      console.log(action.payload);
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
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = null;
      state.error = action.payload;
    },
    [fetchEditData.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchEditData.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [fetchEditData.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = null;
    },
    [initAuth.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [initAuth.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout, login, edit } = authSlice.actions;
export default authSlice.reducer;
// // /* eslint-disable no-param-reassign */
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../service/config";
// import axios from "axios";

// export const fetchAuth = createAsyncThunk(
//   "auth/fetchAuth",
//   async (userData) => {
//     try {
//       const response = await axios.post(`${BASE_URL}users/login`, userData);
//       localStorage.setItem("token", response.data.user.token);
//       console.log(response.data);
//       localStorage.setItem("data", JSON.stringify(response.data));
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// );
// export const fetchRegister = createAsyncThunk(
//   "auth/fetchRegister",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${BASE_URL}users`, userData);
//       localStorage.setItem("token", response.data.user.token);
//       console.log(response.data);
//       localStorage.setItem("data", JSON.stringify(response.data));
//       console.log(response);
//       return response.data;
//     } catch (e) {
//       throw new Error("request error");
//     }
//   }
// );

// export const fetchEditData = createAsyncThunk(
//   "auth/fetchRegister",
//   async (userData) => {
//     const token = localStorage.getItem("token");
//     const response = await fetch(`${BASE_URL}user`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(userData),
//     });
//     const data = await response.json();
//     // в этом запросе при перезагрузке страницы токен обновлялся поэтому выбрасывало из учетки
//     // localStorage.setItem("token", JSON.stringify(data.user.token));
//     localStorage.setItem("data", JSON.stringify(data));
//     localStorage.setItem("image", JSON.stringify(data.user.image));
//     console.log(data);
//     console.log(response);
//     return data;
//   }
// );

// // при перезагрузке страницы, чтобы не выбрасывало
// export const initAuth = createAsyncThunk("auth/initAuth", async () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const response = await axios.get(`${BASE_URL}user`, {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });
//     localStorage.setItem("data", JSON.stringify(response.data));
//     console.log(response.data);
//     return response.data;
//   } else {
//     return null;
//   }
// });

// const initialState = {
//   data: null,
//   status: "loading",
//   error: null,
// };
// // // realworld-docs.netlify
// const authSlice = createSlice({
//   name: "auth",
//   initialState,

//   reducers: {
//     logout: (state) => {
//       state.data = null;
//     },
// login: (state, action) => {
//   console.log("login");
//   state.data = action.payload;
//   localStorage.setItem("data", JSON.stringify(action.payload));

// },
//   },
//   extraReducers: {
//     [fetchAuth.pending]: (state) => {
//       state.status = "loading";
//       state.data = null;
//     },
//     [fetchAuth.fulfilled]: (state, action) => {
//       state.status = "resolved";
//       state.data = action.payload;
//     },
//     [fetchAuth.rejected]: (state, action) => {
//       state.status = "rejected";
//       state.data = null;
//     },
//     [fetchRegister.pending]: (state) => {
//       state.status = "loading";
//       state.data = null;
//     },
//     [fetchRegister.fulfilled]: (state, action) => {
//       state.status = "resolved";
//       state.data = action.payload;
//     },
//     [fetchRegister.rejected]: (state, action) => {
//       state.status = "rejected";
//       state.data = null;
//       state.error = action.payload;
//     },
//     [fetchEditData.pending]: (state) => {
//       state.status = "loading";
//       state.data = null;
//     },
//     [fetchEditData.fulfilled]: (state, action) => {
//       state.status = "resolved";
//       state.data = action.payload;
//     },
//     [fetchEditData.rejected]: (state, action) => {
//       state.status = "rejected";
//       state.data = null;
//     },
//     [initAuth.fulfilled]: (state, action) => {
//       state.status = "resolved";
//       state.data = action.payload;
//     },
//     [initAuth.rejected]: (state, action) => {
//       state.status = "rejected";
//       state.data = null;
//     },
//   },
// });

// export const selectIsAuth = (state) => Boolean(state.auth.data);
// export const { logout, login } = authSlice.actions;
// export default authSlice.reducer;
